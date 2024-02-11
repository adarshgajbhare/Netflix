import React from 'react'

const Recommendations = ({vis}) => {
  console.log("Hellow there from rec", vis)
  return (
    <>
        <div className="superParent absolute inset-0 top-[50%] h-full w-full" > 
       <div className="main-rec hidden h-screen w-full relative flex items-center justify-center">
             <div className="overlay-rec absolute inset-0 h-full w-full bg-black opacity-50">
                     
             </div>
             <div className="window-rec h-[80%] w-[70%] mx-auto bg-red-500">
                 <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt, esse soluta? Adipisci illo, molestiae et quia sunt molestias laudantium dignissimos reprehenderit rem voluptas nemo temporibus, dolores possimus repellendus eveniet magnam laboriosam voluptatibus distinctio aliquam facilis quidem consequuntur! Quos corporis, culpa iure harum voluptas, quam officiis maiores soluta expedita, blanditiis nulla!</p>
             </div>
       </div>
      </div>
    </>
  )
}

export default Recommendations
