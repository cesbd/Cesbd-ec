
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
                src="/assets/brands/BLACK-AND-DECKER.png"
                alt="Dewalt"
                className="object-fill h-[95%] w-[95%] rounded-md"
              />
            </div>
          </a>
        </CarouselItem>

        <CarouselItem>
          <a href="/marcas/dewalt">
            <div className="overflow-hidden rounded-xl flex items-center justify-center mx-auto">
              <img
                src="/assets/brands/DEWALT.png"
                alt="Dewalt"
                className="object-fill h-[95%] w-[95%] rounded-md"
              />
            </div>
          </a>
        </CarouselItem>

        <CarouselItem>
          <a href="/marcas/stanley">
            <div className="overflow-hidden rounded-xl flex items-center justify-center mx-auto">
              <img
                src="/assets/brands/STANLEY.png"
                alt="Dewalt"
                className="w-[95%] h-[95%] object-fill rounded-md"
              />
            </div>
          </a>
        </CarouselItem>

        <CarouselItem>
          <a href="/marcas/craftsman">
            <div className="overflow-hidden rounded-xl flex items-center justify-center mx-auto">
              <img
                src="/assets/brands/CRAFTSMAN.png"
                alt="Dewalt"
                className="w-[95%] h-[95%] object-fill rounded-md"
              />
            </div>
          </a>
        </CarouselItem>

        <CarouselItem>
          <a href="/marcas/irwin">
            <div className="overflow-hidden rounded-xl flex items-center justify-center mx-auto">
              <img
                src="/assets/brands/IRWIN.png"
                alt="Dewalt"
                className="w-[95%] h-[95%] object-fill rounded-md"
              />
            </div>
          </a>
        </CarouselItem>

        <CarouselItem>
          <a href="/marcas/proto">
            <div className="overflow-hidden rounded-xl flex items-center justify-center mx-auto">
              <img
                src="/assets/brands/PROTO.png"
                alt="Dewalt"
                className="w-[95%] h-[95%] object-fill rounded-md bg-[#EE2E1E]"
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
