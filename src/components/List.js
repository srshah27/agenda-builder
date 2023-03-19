import { ComponentStyleConfig } from '@chakra-ui/react'

export default function List() {
  
const ComponentStyle = {
  // style object for base or default style
  baseStyle: {},
  // styles for different sizes ("sm", "md", "lg")
  sizes: {},
  // styles for different visual variants ("outline", "solid")
  variants: {},
  // default values for 'size', 'variant' and 'colorScheme'
  defaultProps: {
    size: '',
    variant: '',
    colorScheme: '',
  },

}
  return (
    <div className="mt-6 mb-36">
      
        <div  className="relative pb-8">
        
            <span
              className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-primary"
              aria-hidden="true"
            > </span>
         
          <div className="relative flex items-start space-x-3">
            <div className="relative">
               
            </div>
            <div className="md:w-96 flex-1 max-sm:w-44">
              <div>
                <div className="text-sm text-gray-500 max-sm:hidden">
                  text
                </div>
                <div
                  className={` absolute font-medium sm:hidden text-gray-900  
                     'top-0' : 'top-2.5'
                  `}
                >
                 <p> text1</p>
                </div>
                <p className="font-medium text-gray-900 max-sm:hidden">
                  text2
                </p>
              </div>
            </div>
          </div>
        </div>
     
    </div>
  )
}
