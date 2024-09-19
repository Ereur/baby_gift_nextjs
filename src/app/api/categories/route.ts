// app/api/categories/route.js

import { NextResponse } from 'next/server';
// import { createClient } from '@supabase/supabase-js';
// import { promises as fs } from 'fs';
import { extractAndSetSession } from '@/utils/auth';
import {normalizeString,readFileAsBase64} from '@/utils/helpers';
// import path from 'path';
import supabase from '@/utils/supabaseClient';
// import { strict } from 'assert';



export async function GET(request: Request) {
  const url = new URL(request.url);
  const userId = url.searchParams.get('userId');

  if (!userId) {
    return NextResponse.json({ error: 'Missing userId' }, { status: 400 });
  }

  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('user_id', userId);

    if (error) {
      console.error('Error fetching categories:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json({ error: 'Error fetching categories' }, { status: 500 });
  }
  return NextResponse.json({ message: 'Hello from categories' }, { status: 200 });
}

// app/api/categories/route.ts

export async function POST(request: Request) {
  const formData = await request.formData();
  const userId = formData.get('userId') as string;
  const name = formData.get('name') as string;
  const image = formData.get('categorie_image') as File;

  if (!userId || !name || !image) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

 

  try {
      // Extract and set session
      const { error:SessionEr, status} = await extractAndSetSession(request);
      if (SessionEr) {
        return NextResponse.json({ SessionEr }, { status });
      }

    // Get the current user
    // const { data: user, error: userError } = await supabase.auth.getUser();

    // if (userError) {
    //   console.error('Error retrieving user:', userError);
    //   return NextResponse.json({ error: 'Error retrieving user' }, { status: 401 });
    // }

    // console.log("user", user);

    // Read image as Base64
    const imageBase64 = await readFileAsBase64(image);

    const fileExtension = image.type.split('/').pop();
    // Upload image
    const normalized_name = normalizeString(name)
    const imageResponse = await supabase.storage
      .from('categorie')
      .upload(`category-images/${normalized_name}-${userId}-image.${fileExtension}`, Buffer.from(imageBase64, 'base64'), {
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

    // Insert category
    console.log('userID', userId);
    const { data, error } = await supabase
      .from('categories')
      .insert({
        user_id: userId,   // Use the userId from the request body
        name: name,        // Category name entered by the user
        image_url: publicUrl.data.publicUrl // Store the image URL
      })
      .select();  // Make sure you use select() to get the inserted row back

    if (error) {
      console.error('Error inserting category:', error);
      return NextResponse.json({ error: error.message }, { status: 404 });
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('Error reading files:', error);
    return NextResponse.json({ error: 'Error reading files' }, { status: 500 });
  }
}


export async function DELETE(request: Request) {

  // const formData = await request.formData();
  // const categorie_Id = formData.get('categorie_Id') as File;

  const url = new URL(request.url);
const queryParams = new URLSearchParams(url.search);
const categorie_Id = queryParams.get('categorie_Id');

console.log('categorie_Id', categorie_Id);

  if (!categorie_Id) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  try {
    // Extract cookies from headers
    const cookies = request.headers.get('Cookie');
    if (!cookies) {
      return NextResponse.json({ error: 'No cookies found' }, { status: 401 });
    }

    // Parse cookies to get access_token and refresh_token
    const cookieMap = new Map(
      cookies.split('; ').map(cookie => {
        const [key, value] = cookie.split('=');
        return [key, value];
      })
    );
    const accessToken = cookieMap.get('access_token') as string;
    const refreshToken = cookieMap.get('refresh_token') as string;

    if (!accessToken || !refreshToken) {
      return NextResponse.json({ error: 'Missing access or refresh token' }, { status: 401 });
    }

    // Set the session token
    const { error: sessionError } = await supabase.auth.setSession({
      access_token: accessToken,
      refresh_token: refreshToken,
    });

    if (sessionError) {
      console.error('Error setting session:', sessionError);
      return NextResponse.json({ error: 'Error setting session' }, { status: 401 });
    }

    // Delete category
    const { data, error } = await supabase
      .from('categories')
      .delete()
      .eq('id', categorie_Id)
      .select();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: error.code as unknown as number });
    }

    if (!data || data.length === 0) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }

    // if(data)
    //check if data is empty and return the apropriate error code 
    
    //delete image 
    const { data: imageResponse, error: imageError } = await supabase.storage
      .from('categorie')
      .remove([data[0].image_url]);

    if (imageError) {
      console.error('Error deleting image:', imageError);
      return NextResponse.json({ error: 'Error deleting image' }, { status: 500 });
    }
    console.log('imageResponse', imageResponse);

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Error deleting category:', error);
    return NextResponse.json({ error: 'Error deleting category' }, { status: 500 });
  }
}