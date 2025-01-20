
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useRef, useState } from 'react';
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
// import Autoplay from "embla-carousel-autoplay";

interface BrandGaleryProps {
  images: string[];
}

export function BrandGalery({ images }: BrandGaleryProps) {
  const imageRef = useRef<string>(null);
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <Carousel
        className="w-full max-w-8xl mt-12"
        opts={{ align: 'start', loop: true, dragFree: true, inViewThreshold: 0.5 }}
      // plugins={[
      //   Autoplay({
      //     delay: 1200,
      //     active: true,
      //   }),
      // ]}
      >
        <CarouselContent className="-ml-1 [&>div>a>div]:aspect-square [&>div>a>div]:bg-white [&>div>a>div]:shadow-lg [&>div>a>div]:rounded-md [&>div]:basis-1/2 lg:[&>div]:basis-1/3 xl:[&>div]:basis-1/4 [&>div]:pl-4">
          {
            images.map((image, index) => (
              <CarouselItem key={index} className="hover:cursor-pointer flex items-center justify-center" onClick={() => {
                imageRef.current = image
                setOpen(true);
              }}>
                <div className="overflow-hidden rounded-xl flex items-center justify-center mx-auto">
                  <img
                    src={image}
                    alt="Dewalt"
                    className="object-fill h-[95%] w-[95%] rounded-md"
                  />
                </div>
              </CarouselItem>
            ))
          }

          {/* <CarouselItem className="hover:cursor-pointer" onClick={() => {
            imageRef.current = "/assets/brands/BLACK-AND-DECKER.png"
            setOpen(true);
          }}>
            <div className="overflow-hidden rounded-xl flex items-center justify-center mx-auto">
              <img
                src="/assets/brands/BLACK-AND-DECKER.png"
                alt="Dewalt"
                className="object-fill h-[95%] w-[95%] rounded-md"
              />
            </div>
          </CarouselItem>

          <CarouselItem className="hover:cursor-pointer" onClick={() => {
            imageRef.current = "/assets/brands/DEWALT.png"
            setOpen(true);
          }}>

            <div className="overflow-hidden rounded-xl flex items-center justify-center mx-auto">
              <img
                src="/assets/brands/DEWALT.png"
                alt="Dewalt"
                className="object-fill h-[95%] w-[95%] rounded-md"
              />
            </div>
          </CarouselItem>

          <CarouselItem className="hover:cursor-pointer" onClick={() => {
            imageRef.current = "/assets/brands/STANLEY.png"
            setOpen(true);
          }}>

            <div className="overflow-hidden rounded-xl flex items-center justify-center mx-auto">
              <img
                src="/assets/brands/STANLEY.png"
                alt="Dewalt"
                className="w-[95%] h-[95%] object-fill rounded-md"
              />
            </div>
          </CarouselItem>

          <CarouselItem className="hover:cursor-pointer" onClick={() => {
            imageRef.current = "/assets/brands/CRAFTSMAN.png"
            setOpen(true);
          }}>

            <div className="overflow-hidden rounded-xl flex items-center justify-center mx-auto">
              <img
                src="/assets/brands/CRAFTSMAN.png"
                alt="Dewalt"
                className="w-[95%] h-[95%] object-fill rounded-md"
              />
            </div>
          </CarouselItem>

          <CarouselItem className="hover:cursor-pointer" onClick={() => {
            imageRef.current = "/assets/brands/IRWIN.png"
            setOpen(true);
          }}>

            <div className="overflow-hidden rounded-xl flex items-center justify-center mx-auto">
              <img
                src="/assets/brands/IRWIN.png"
                alt="Dewalt"
                className="w-[95%] h-[95%] object-fill rounded-md"
              />
            </div>
          </CarouselItem>

          <CarouselItem className="hover:cursor-pointer" onClick={() => {
            imageRef.current = "/assets/brands/PROTO.png"
            setOpen(true);
          }}>

            <div className="overflow-hidden rounded-xl flex items-center justify-center mx-auto">
              <img
                src="/assets/brands/PROTO.png"
                alt="Dewalt"
                className="w-[95%] h-[95%] object-fill rounded-md bg-[#EE2E1E]"
              />
            </div>
          </CarouselItem> */}
        </CarouselContent>

        <CarouselPrevious
          className="ml-2"
        />

        <CarouselNext
          className="mr-2"
        />
      </Carousel>

      <Dialog open={isOpen} onOpenChange={setOpen}>
        <DialogContent >
          <img src={imageRef.current!} alt="Dewalt" className="object-fill rounded-md mt-1" />
        </DialogContent>
      </Dialog>

    </>
  )
}
