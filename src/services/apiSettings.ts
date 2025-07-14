import supabase from './supabase';

export async function getSettings() {
  console.log('enter to get settings')
  const { data, error } = await supabase.from('setting').select('*').single();
  console.log('data: ', data);
  if (error) {
    console.log('enter to error');
    console.error(error);
    console.error('Supabase error:', error);

    throw new Error('Settings could not be loaded');
  }
  return data;
}

// We expect a newSetting object that looks like {setting: newValue}
export async function updateSetting(newSetting) {
  const { data, error } = await supabase
    .from('setting')
    .update(newSetting)
    // There is only ONE row of settings, and it has the ID=1, and so this is the updated one
    .eq('id', 1)
    .single();

  if (error) {
    console.error('error: ',error);
    throw new Error('Settings could not be updated');
  }
  return data;
}
