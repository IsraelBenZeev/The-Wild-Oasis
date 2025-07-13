import type { CabinType } from '../types/CabinType';
import supabase, { supabaseUrl } from './supabase';

export const getCabins = async () => {
  const { data, error } = await supabase.from('cabins').select('*');
  if (error) {
    console.log(error);
    throw new Error('Cabins could not be lodaer');
  }
  return data;
};
export const deleteCabin = async (id: number) => {
  const { data, error } = await supabase.from('cabins').delete().eq('id', id);
  if (error) {
    console.log(error);
    throw new Error('Cabins could not be lodaer');
  }
  return data;
};

// export const creatEditCabin = async (newCabin: CabinType, id?: number) => {
//   console.log('newCabin: ', newCabin);
//   const hasImagePatch = newCabin.image?.startsWith?.(supabaseUrl);
//   const nameImage = ?`${Math.random()}- ${newCabin.image.name}`.replace('/', '');
//   const imagePatch = hasImagePatch
//     ? newCabin.image
//     : `${supabaseUrl}/storage/v1/object/public/cabins-images/${nameImage}`;

//   let query = await supabase.from('cabins');
//   if (!id) query =  query.insert([{ ...newCabin, image: imagePatch }]);
//   if (id) query = query.update({ other_column: 'otherValue' }).eq('id', id).select();
//   const { data, error } = await query;
//   if (error) {
//     console.log(error);
//     throw new Error('Cabins could not be created');
//   }
//   // Upload omage
//   const { error: storegError } = await supabase.storage
//     .from('cabins-images')
//     .upload(nameImage, newCabin.image!);
//   // Delete the cabin if there an error an uploding image
//   if (storegError) {
//     await supabase.from('cabins').delete().eq('id', data[0].id);
//     console.log(storegError);
//     throw new Error(
//       'Cabins image could not be uploaded and the cabin not created'
//     );
//   }
//   return data;
// };
export const creatEditCabin = async (newCabin: CabinType, id?: number) => {
  // We check two situations:
  // 1) If we need to create a new cabin
  // 2) If we need to update an existing cabin, and whether the image was updated or not
  console.log('newCabin: ', newCabin);
  
  // Return true if the image is old and was not updated
  const isImageUrl =
    typeof newCabin.image === 'string' &&
    newCabin.image.startsWith(supabaseUrl);

  // Return true end new file, if the image is new
  const imageFile = typeof newCabin.image !== 'string' ? newCabin.image : null;

  // If the image is new, we assign a new link.
  const nameImage = imageFile
    ? `${Math.random()}-${imageFile.name}`.replace('/', '')
    : null;

  // if the image is new this will be new patch, else the patch will be pld patch
  const imagePatch = isImageUrl
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabins-images/${nameImage}`;

  // Conection to table of cabins
  let query = supabase.from('cabins');

  // sitotion for creting
  if (!id) {
    query = query.insert([{ ...newCabin, image: imagePatch }]).select();

    // sitotion for updating
  } else {
    query = query
      .update({ ...newCabin, image: imagePatch })
      .eq('id', id)
      .select();
  }

  const { data, error } = await query;
  if (error) {
    console.log(error);
    throw new Error('Cabin could not be created/edited');
  }
  // If the image is new, we will upload it.
  if (imageFile) {
    const { error: storageError } = await supabase.storage
      .from('cabins-images')
      .upload(nameImage!, imageFile, {});

    // If there was an error when uploading the image, we delete the row.
    if (storageError) {
      await supabase.from('cabins').delete().eq('id', data[0].id);
      console.log(storageError);
      throw new Error(
        'Cabin image could not be uploaded and the cabin was not created'
      );
    }
  }

  return data;
};
