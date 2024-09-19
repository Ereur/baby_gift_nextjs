// app/api/products/route.js

import { NextResponse } from 'next/server';
import {extractAndSetSession} from '@/utils/auth'
import {readFileAsBase64,normalizeString} from '@/utils/helpers'
import supabase from '@/utils/supabaseClient';

export async function GET(request: Request)
{
    
}

export async function POST(request: Request)
{
    const formData = await request.formData();
    const name = formData.get('name') as string;
    const category_id = formData.get('category_id') as string;
    const note = formData.get('note') as string;
    const image = formData.get('image') as File;

    if (!name || !category_id || !note || !image) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    try{
      const { error:SessionEr, status, session:Session } = await extractAndSetSession(request);
      if (SessionEr) {
        return NextResponse.json({ SessionEr }, { status });
      }
      
       // Read image as Base64
    const imageBase64 = await readFileAsBase64(image);

    const fileExtension = image.type.split('/').pop();
    // Upload image
    const normalized_name = normalizeString(name)
    const imageResponse = await supabase.storage
      .from('categorie')
      .upload(`product-image/${normalized_name}-${category_id}-${Session?.user?.id}-image.${fileExtension}`, Buffer.from(imageBase64, 'base64'), {
        cacheControl: '3600',
        upsert: false,
      });

    if (imageResponse.error) {
      console.log('imageResponse.error', imageResponse.error);
      return NextResponse.json({ error: imageResponse.error.message }, { status: 409});
    }

    const  publicUrl  = supabase
    .storage
    .from('categorie')
    .getPublicUrl(imageResponse.data.path)
  

     // Insert Product
     const { data, error } = await supabase
     .from('products')
     .insert({
      name: name,   
      category_id: category_id,   
       image_url: publicUrl.data.publicUrl,
        note: note,
        user_id: Session?.user?.id,
     })
     .select();  // Make sure you use select() to get the inserted row back

   if (error) {
     return NextResponse.json({ error: error.message }, { status: error.code as unknown as number });
   }

   return NextResponse.json(data, { status: 201 });
    }
    catch(error){
      console.error(error);
      return NextResponse.json({ error: error }, { status: 500 });
    }
  

    //
}

export async function DELETE(request: Request)
{

}