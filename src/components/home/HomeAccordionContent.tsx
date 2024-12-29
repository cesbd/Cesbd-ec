import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";


export function HomeAccordionContent() {
  return (
    <Accordion type="single" collapsible className="w-full my-4">
      <AccordionItem value="item-1" className="rounded-md shadow-sm border-amber-400 border-l-4 mb-6">
        <AccordionTrigger className="font-semibold text-xl hover:no-underline hover:bg-amber-100 hover:transition-all duration-300 px-4">Programa Modular de Capacitación</AccordionTrigger>
        <AccordionContent>
          <p className="text-lg px-4">
            Formación Certificada por niveles, para que adquieras habilidades técnicas avanzadas en el uso de herramientas de las marcas más confiables del mercado. <br />
            <ul className="list-disc list-inside pl-8 mt-1">
              <li>
                <span className="font-bold">Básico:</span> Domina los fundamentos de las herramientas y su mantenimiento
              </li>
              <li>
                <span className="font-bold">Profesional:</span> Perfecciona tus habilidades con técnicas avanzadas.
              </li>
              <li>
                <span className="font-bold">Semi Industrial e Industrial:</span> Prepárate para proyectos de alta exigencia y complejidad.
              </li>
            </ul>
          </p>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-2" className="rounded-md shadow-sm border-amber-400 border-l-4 mb-6">
        <AccordionTrigger className="font-semibold text-xl hover:no-underline hover:bg-amber-100 hover:transition-all duration-300 px-4">Talleres, Activaciones y Demostraciones</AccordionTrigger>
        <AccordionContent>
          <p className="text-lg px-4">
            Participa en eventos donde podrás conocer y probar tanto herramientas como accesorios de última
            generación, recibir asesoría directa de expertos y descubrir cómo optimizar tus proyectos con
            tecnologías innovadoras.
          </p>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-3" className="rounded-md shadow-sm border-amber-400 border-l-4 mb-6">
        <AccordionTrigger className="font-semibold text-xl hover:no-underline hover:bg-amber-100 hover:transition-all duration-300 px-4">Promociones y Ofertas</AccordionTrigger>
        <AccordionContent>
          <p className="text-lg px-4">
            Aprovecha incentivos y descuentos exclusivos en herramientas, accesorios y repuestos disponibles
            en Puntos de Venta y Centros Autorizados de Servicio asociados al CESBD.
          </p>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-4" className="rounded-md shadow-sm border-amber-400 border-l-4 mb-6">
        <AccordionTrigger className="font-semibold text-xl hover:no-underline hover:bg-amber-100 hover:transition-all duration-300 px-4">Premios y Concursos</AccordionTrigger>
        <AccordionContent>
          <p className="text-lg px-4">
            Con cada compra participas por premios increíbles. Es nuestra forma de agradecer tu preferencia y
            lealtad.
          </p>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-5" className="rounded-md shadow-sm border-amber-400 border-l-4 mb-6">
        <AccordionTrigger className="font-semibold text-xl hover:no-underline hover:bg-amber-100 hover:transition-all duration-300 px-4">Premios y Regalos</AccordionTrigger>
        <AccordionContent>
          <p className="text-lg px-4">
            Recompensamos tu fidelidad en cada compra con regalos y también participas por premios
            increíbles. Es nuestra forma de agradecer tu preferencia y lealtad.
          </p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
