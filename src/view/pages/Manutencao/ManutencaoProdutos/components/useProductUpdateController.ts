import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { productsService } from '../../../../../app/services/productsService';
import { Product } from '../../../../../app/entities/Product';
import { ChangeEvent, useEffect, useState } from 'react';

const schema = z.object({
  name: z.string().min(1, 'O nome não pode ser vazio'),
  description: z.string().min(1, 'A descrição não pode ser vazia'),
  size: z.string().min(1, 'A dimensão não pode ser vazia'),
  price: z.coerce.number(),
  category_id: z.coerce.number(),
  imageUrl: z.string(),
});

type FormData = z.infer<typeof schema>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useProductUpdateController(product: Product | undefined, onClose: any) {

  useEffect(() => {
    reset(product);
  }, [product]);

  const {
    register,
    handleSubmit: hookFormSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: product?.name,
      description: product?.description,
      size: product?.size,
      price: product?.price,
      category_id: product?.category_id,
      imageUrl: product?.imageUrl,
    }
  });

  const queryClient = useQueryClient();
  const {
    isLoading,
    mutateAsync: updateProduct,
  } = useMutation(productsService.updateProduct);

  const {
    mutateAsync: uploadNewImage,
  } = useMutation(productsService.uploadNewProductImage);

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      if(fileChanged && file){
        const newUploaded = (await uploadNewImage({id: product!.productId, file})).data;
        data.imageUrl = newUploaded.imagePath;
      }
      await updateProduct({
        id: product!.productId,
        ...data,
      });

      await queryClient.invalidateQueries({ queryKey: ['listProducts'] });
      onClose();
      toast.success('O item foi editado com sucesso!');
    } catch {
      onClose();
      toast.error('Erro ao salvar as alterações!');
    }
  });

  const [file, setFile] = useState<File>();
  const [fileChanged, setFileChanged] = useState(false);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      setFileChanged(true);
      setValue('imageUrl', e.target.files[0].name);
    }
  };

  return {
    handleSubmit,
    register,
    isLoading,
    errors,
    handleFileChange,
    file
  };

}
