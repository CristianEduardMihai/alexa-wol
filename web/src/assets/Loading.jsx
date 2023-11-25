import {useEffect} from "react"
import {useRef} from "react"

export function Loading(){
  const html = `
  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: rgba(221, 221, 221, 0); display: block;" width="160px" height="160px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
<g transform="translate(58,50)">
<g transform="rotate(0)">
<circle cx="0" cy="0" r="1" fill="#ffffff" fill-opacity="1">
  <animateTransform attributeName="transform" type="scale" begin="-0.875s" values="2.19 2.19;1 1" keyTimes="0;1" dur="1s" repeatCount="indefinite"></animateTransform>
  <animate attributeName="fill-opacity" keyTimes="0;1" dur="1s" repeatCount="indefinite" values="1;0" begin="-0.875s"></animate>
</circle>
</g>
</g><g transform="translate(55.65685424949238,55.65685424949238)">
<g transform="rotate(45)">
<circle cx="0" cy="0" r="1" fill="#ffffff" fill-opacity="0.875">
  <animateTransform attributeName="transform" type="scale" begin="-0.75s" values="2.19 2.19;1 1" keyTimes="0;1" dur="1s" repeatCount="indefinite"></animateTransform>
  <animate attributeName="fill-opacity" keyTimes="0;1" dur="1s" repeatCount="indefinite" values="1;0" begin="-0.75s"></animate>
</circle>
</g>
</g><g transform="translate(50,58)">
<g transform="rotate(90)">
<circle cx="0" cy="0" r="1" fill="#ffffff" fill-opacity="0.75">
  <animateTransform attributeName="transform" type="scale" begin="-0.625s" values="2.19 2.19;1 1" keyTimes="0;1" dur="1s" repeatCount="indefinite"></animateTransform>
  <animate attributeName="fill-opacity" keyTimes="0;1" dur="1s" repeatCount="indefinite" values="1;0" begin="-0.625s"></animate>
</circle>
</g>
</g><g transform="translate(44.34314575050762,55.65685424949238)">
<g transform="rotate(135)">
<circle cx="0" cy="0" r="1" fill="#ffffff" fill-opacity="0.625">
  <animateTransform attributeName="transform" type="scale" begin="-0.5s" values="2.19 2.19;1 1" keyTimes="0;1" dur="1s" repeatCount="indefinite"></animateTransform>
  <animate attributeName="fill-opacity" keyTimes="0;1" dur="1s" repeatCount="indefinite" values="1;0" begin="-0.5s"></animate>
</circle>
</g>
</g><g transform="translate(42,50)">
<g transform="rotate(180)">
<circle cx="0" cy="0" r="1" fill="#ffffff" fill-opacity="0.5">
  <animateTransform attributeName="transform" type="scale" begin="-0.375s" values="2.19 2.19;1 1" keyTimes="0;1" dur="1s" repeatCount="indefinite"></animateTransform>
  <animate attributeName="fill-opacity" keyTimes="0;1" dur="1s" repeatCount="indefinite" values="1;0" begin="-0.375s"></animate>
</circle>
</g>
</g><g transform="translate(44.34314575050762,44.34314575050762)">
<g transform="rotate(225)">
<circle cx="0" cy="0" r="1" fill="#ffffff" fill-opacity="0.375">
  <animateTransform attributeName="transform" type="scale" begin="-0.25s" values="2.19 2.19;1 1" keyTimes="0;1" dur="1s" repeatCount="indefinite"></animateTransform>
  <animate attributeName="fill-opacity" keyTimes="0;1" dur="1s" repeatCount="indefinite" values="1;0" begin="-0.25s"></animate>
</circle>
</g>
</g><g transform="translate(50,42)">
<g transform="rotate(270)">
<circle cx="0" cy="0" r="1" fill="#ffffff" fill-opacity="0.25">
  <animateTransform attributeName="transform" type="scale" begin="-0.125s" values="2.19 2.19;1 1" keyTimes="0;1" dur="1s" repeatCount="indefinite"></animateTransform>
  <animate attributeName="fill-opacity" keyTimes="0;1" dur="1s" repeatCount="indefinite" values="1;0" begin="-0.125s"></animate>
</circle>
</g>
</g><g transform="translate(55.656854249492376,44.34314575050762)">
<g transform="rotate(315)">
<circle cx="0" cy="0" r="1" fill="#ffffff" fill-opacity="0.125">
  <animateTransform attributeName="transform" type="scale" begin="0s" values="2.19 2.19;1 1" keyTimes="0;1" dur="1s" repeatCount="indefinite"></animateTransform>
  <animate attributeName="fill-opacity" keyTimes="0;1" dur="1s" repeatCount="indefinite" values="1;0" begin="0s"></animate>
</circle>
</g>
</g>
</svg>
  `

  const ref = useRef()

  useEffect(()=>{
    if(ref.current) ref.current.innerHTML = html
  })

  return (
    <div ref={ref} className="grid h-12 w-12 items-center content-center justify-center"/>
  )
}
