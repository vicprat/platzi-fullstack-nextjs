import { useRef, useEffect, useState, ImgHTMLAttributes } from "react"

type lazyImageProps = { src: string}

type ImageNative = ImgHTMLAttributes<HTMLImageElement>

type Props = lazyImageProps & ImageNative

export const LazyImage = ({src, ...ImgProps}: Props): JSX.Element => {
    const node = useRef<HTMLImageElement>(null)
    const [currentSrc, setCurrentSrc] = useState("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjMyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4=")
    
useEffect(() => {
        //a new observer 
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setCurrentSrc(src)
                }
            })
        })
        //observe the node  
        if (node.current){
            observer.observe(node.current)
        }
        return () => {
            //disconnect the observer
            observer.disconnect()
        }
},[src])

    return <img 
    ref={node} 
    src={currentSrc} 
    {...ImgProps}
    />
}