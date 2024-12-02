'use client';

import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from '@/components/ui/drawer';
import { getImagesBack } from '@/lib/actions';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export function DrawerDemo({
  showData,
  index,
  variantDrawer,
  productDrawer,
  setLoadingImage,
  loadingImage,
  imgRes,
  setImgRes
}: any) {
  useEffect(() => {
    if (productDrawer && variantDrawer) {
      const productId = productDrawer.id,
        variantId = variantDrawer.image_id;

      const getImages = async () => {
        setLoadingImage(true);

        const res = await getImagesBack(variantId, productId);
        if (res.images) {
          const imagesReceipted = res.images.src;
          setImgRes(imagesReceipted);
        }
        setLoadingImage(false);
      };

      getImages();
    }
  }, [variantDrawer]);

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button onClick={() => showData(index)} variant="outline">
          Open Drawer
        </Button>
      </DrawerTrigger>
      {variantDrawer ? (
        <DrawerContent>
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader>
              <DrawerTitle>Producto: {productDrawer.name}</DrawerTitle>
              <DrawerDescription>
                Código SKU: {variantDrawer.sku || 'N/A'}
              </DrawerDescription>
            </DrawerHeader>
            <div className="p-4">
              <div className="mb-4">
                <p>
                  <strong>Precio:</strong> ${variantDrawer.price}
                </p>
                <p>
                  <strong>Precio Comparativo:</strong> $
                  {variantDrawer.compare_at_price || 'N/A'}
                </p>
                <p>
                  <strong>Stock:</strong> {variantDrawer.stock || 0}
                </p>
                <p>
                  <strong>Dimensiones (LxWxH):</strong> {variantDrawer.depth} x{' '}
                  {variantDrawer.width} x {variantDrawer.height} cm
                </p>
                <p>
                  <strong>Peso:</strong> {variantDrawer.weight} kg
                </p>
              </div>
              <div className="mt-3 flex h-auto items-center justify-center bg-gray-200">
                <p className="text-sm text-gray-500">
                  {loadingImage ? (
                    'Cargando...'
                  ) : imgRes !== '' ? (
                    <Image src={imgRes} alt={imgRes} width={200} height={200} />
                  ) : (
                    'Sin Imagen'
                  )}
                </p>
              </div>
            </div>
            <DrawerFooter>
              <DrawerClose asChild>
                <Button variant="outline">Cerrar</Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      ) : (
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>No hay información de la variante.</DrawerTitle>
            <DrawerDescription>
              Selecciona una variante para más detalles.
            </DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Cerrar</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      )}
    </Drawer>
  );
}
