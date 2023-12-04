import { httpClient } from '../httpClient';

export interface UploadNewProductImageProps {
  id: number;
  file: File;
}

export interface FileUploadedProps {
  imagePath: string;
}


export async function uploadNewProductImage({id, file}: UploadNewProductImageProps) {
  const bodyFormData = new FormData();
  bodyFormData.append('file', file);
  return await httpClient.post<FileUploadedProps>(`/products/uploadImage/${id}`,
    bodyFormData,
  );
}
