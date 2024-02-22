import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface CarouselComponentProps<
  T extends { id: number; image: string; name: string },
> {
  data: T[];
  setData: (item: T) => void;
  close: () => void;
}

const CarouselComponent = <
  T extends { id: number; image: string; name: string },
>(
  props: CarouselComponentProps<T>,
) => {
  return (
    <Carousel className="w-[70%]">
      <CarouselContent>
        {props.data.length === 0 ? (
          <CarouselItem>
            <Card className={"border-none"}>
              <CardContent className="flex aspect-square items-center justify-center p-6">
                <span className="text-base font-semibold">
                  검색 결과가 없습니다
                </span>
              </CardContent>
            </Card>
          </CarouselItem>
        ) : (
          props.data.map((item) => (
            <CarouselItem key={item.id}>
              <div>
                <Card className={"border-none"}>
                  <CardContent className="flex items-center justify-center flex-col p-2 gap-4">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={150}
                      height={150}
                      className={"rounded-lg mt-2"}
                      onClick={() => {
                        props.setData(item);
                        props.close();
                      }}
                    />
                    <div>{item.name}</div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))
        )}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default CarouselComponent;
