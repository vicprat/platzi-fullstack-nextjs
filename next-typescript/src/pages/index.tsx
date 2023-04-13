import { LazyImage } from "@/components/LazyImage";
import { useState, MouseEventHandler } from "react";
import {random} from "lodash"
  
const myRandom = () => random(1, 123)

//generate simple unique id
const generateId = () => Math.random().toString(36).substr(2, 9)

type ImageItems = {id:string, url:string}

export default function Home() {
  const [images, setImages] = useState<ImageItems[]>([])

  const addNewFox: MouseEventHandler<HTMLButtonElement> = ( event ) => {
    event.preventDefault()

    const newImageItem: ImageItems = {
      id: generateId(), 
      url:`https://randomfox.ca/images/${myRandom()}.jpg`
    }
    setImages([
      ...images,
      newImageItem
    ])
  }

  return (
    <div>
      <h1>Random Fox</h1>
      <button type="button" onClick={addNewFox}>Add a new fox</button>
      {images.map(({id, url}) => (
        <div className="p-4" key={id}>
          <LazyImage 
          src={url} 
          title='random fox'
          onClick={() => console.log('click')}   
          className="rounded-md w-64 h-auto bg-gray-300"           
          />
        </div>
      ))}

    </div>
  )
}
