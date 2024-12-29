
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
// import Autoplay from "embla-carousel-autoplay";


export function CarouselSpacing() {
  return (
    <Carousel
      className="w-full max-w-sm sm:max-w-md lg:max-w-2xl xl:max-w-4xl z-10"
      opts={{ align: 'start', loop: true, dragFree: true, inViewThreshold: 0.5 }}
      // plugins={[
      //   Autoplay({
      //     delay: 1200,
      //     active: true,
      //   }),
      // ]}
    >
      <CarouselContent className="-ml-1 [&>div>a>div]:aspect-square [&>div>a>div]:bg-white [&>div>a>div]:shadow-lg [&>div>a>div]:rounded-md [&>div]:basis-1/2 lg:[&>div]:basis-1/3 xl:[&>div]:basis-1/4 [&>div]:pl-4">
        <CarouselItem>
          <a href="/marcas/black-decker">
            <div className="overflow-hidden rounded-xl flex items-center justify-center mx-auto">
              <img
                src="/assets/brands/black-and-decker-logo.svg"
                alt="Dewalt"
                className="w-[95%] h-[95%] object-contain"
              />
            </div>
          </a>
        </CarouselItem>

        <CarouselItem>
          <a href="/marcas/dewalt">
            <div className="overflow-hidden rounded-xl flex items-center justify-center mx-auto">
              <img
                src="/assets/brands/dewalt-logo.svg"
                alt="Dewalt"
                className="w-[95%] h-[95%] object-contain rounded-md"
              />
            </div>
          </a>
        </CarouselItem>

        <CarouselItem>
          <a href="/marcas/stanley">
            <div className="overflow-hidden rounded-xl flex items-center justify-center mx-auto">
              <img
                src="/assets/brands/stanley-logo.svg"
                alt="Dewalt"
                className="w-[95%] h-[95%] object-contain rounded-md"
              />
            </div>
          </a>
        </CarouselItem>

        <CarouselItem>
          <a href="/marcas/craftsman">
            <div className="overflow-hidden rounded-xl flex items-center justify-center mx-auto">
              <img
                src="/assets/brands/craftsman-logo.svg"
                alt="Dewalt"
                className="w-[95%] h-[95%] object-contain rounded-md"
              />
            </div>
          </a>
        </CarouselItem>

        <CarouselItem>
          <a href="/marcas/irwin">
            <div className="overflow-hidden rounded-xl flex items-center justify-center mx-auto">
              <img
                src="/assets/brands/irwin-logo.jpg"
                alt="Dewalt"
                className="w-[95%] h-[95%] object-cover rounded-md"
              />
            </div>
          </a>
        </CarouselItem>

        <CarouselItem>
          <a href="/marcas/proto">
            <div className="overflow-hidden rounded-xl flex items-center justify-center mx-auto">
              <img
                src="/assets/brands/proto-logo.png"
                alt="Dewalt"
                className="w-[95%] h-[95%] object-contain rounded-md bg-[#EE2E1E]"
              />
            </div>
          </a>
        </CarouselItem>
      </CarouselContent>

      <CarouselPrevious
        className="ml-2"
      />

      <CarouselNext
        className="mr-2"
      />
    </Carousel>
  )
}
