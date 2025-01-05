"use client"
import { TextGenerateEffect } from "@workspace/ui/components/text-generate-effect"
import Image from "next/image"
import { useEffect, useState } from "react"
import IslandSvg from "../images/svg/island/island-4.svg"
import MonsterSvg from "../images/svg/monster/monster-4"
import PiggySvg from "../images/svg/monster/my-piggy.svg"

export const StickMan = () => {
  const [hoverCount, setHoverCount] = useState(0)

  useEffect(() => {
    const leftEye = document.getElementById("left-eye")
    const rightEye = document.getElementById("right-eye")

    const maxOffset = 27
    const getOffset = (
      mouseX: number,
      mouseY: number,
      centerLeftEye: { x: number; y: number },
      centerRightEye: { x: number; y: number }
    ) => {
      let offsetX = (mouseX - (centerRightEye.x + centerLeftEye.x) / 2) / 10

      if (offsetX < -maxOffset) {
        offsetX = -maxOffset
      } else if (offsetX > maxOffset) {
        offsetX = maxOffset
      }
      let offsetY = (mouseY - centerLeftEye.y) / 5

      if (offsetY < -maxOffset) {
        offsetY = -maxOffset
      } else if (offsetY > maxOffset) {
        offsetY = maxOffset
      }
      return [offsetX, offsetY]
    }
    function moveEyes(e: MouseEvent) {
      if (!e || !leftEye || !rightEye) return
      const mouseX = e.pageX
      const mouseY = e.pageY

      const pageScrollOffset = window.scrollY
      const valuesLeftEye = leftEye.getBoundingClientRect()
      const centerLeftEye = {
        x: valuesLeftEye.x + valuesLeftEye.width / 2,
        y: valuesLeftEye.y + pageScrollOffset + valuesLeftEye.height / 2,
      }
      const valuesRightEye = rightEye.getBoundingClientRect()
      const centerRightEye = {
        x: valuesRightEye.x + valuesRightEye.width / 2,
        y: valuesRightEye.y + pageScrollOffset + valuesRightEye.height / 2,
      }

      const [leftOffsetX, leftOffsetY] = getOffset(
        mouseX,
        mouseY,
        centerLeftEye,
        centerRightEye
      )

      leftEye.style.transform = `translate(${leftOffsetX}px, ${leftOffsetY}px)`
      rightEye.style.transform = `translate(${leftOffsetX}px, ${leftOffsetY}px)`
    }
    window.addEventListener("mousemove", moveEyes, false)

    return () => {
      window.removeEventListener("mousemove", moveEyes, false)
    }
  }, [])

  return (
    <div
      className="motion-delay-500 motion-duration-2000 motion-opacity-in-0 bg-background group relative z-[180] ml-auto h-[200px] w-[200px] rounded-full shadow-[0px_0px_35px_35px_var(--background)]"
      onMouseEnter={() => setHoverCount((prev) => prev + 1)}
    >
      <div className="pointer-events-none absolute -top-48 right-[100px] w-[420px] pb-[100px] opacity-0 transition-opacity duration-200 group-hover:pointer-events-auto group-hover:opacity-100">
        <div className="bg-homeBg thought-bubble relative m-5 flex min-h-[40px] min-w-[40px] items-center justify-center rounded-[30px] p-5 text-center">
          <TextGenerateEffect
            key={hoverCount}
            words={`Hello 👋 I am Razvan, React developer and technology enthusiast 🎉`}
          />
        </div>
      </div>
      <div className="animate-float relative flex w-full flex-col items-center justify-center">
        <MonsterSvg className="relative z-10 ml-0 h-1/2 w-1/2" />
        <Image
          src={IslandSvg}
          alt="Island"
          className="-mt-[45px] h-4/5 w-4/5"
        />
        <Image
          src={PiggySvg}
          alt="Piggy"
          className="absolute right-[45px] top-[75px] z-[15] h-[30px] w-[30px]"
        />
      </div>
    </div>
  )
}
