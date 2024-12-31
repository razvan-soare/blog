"use client"
import Image from "next/image"
import React, { useEffect } from "react"
import IslandSvg from "../images/svg/island/island-4.svg"
import MonsterSvg from "../images/svg/monster/monster-4"
import PiggySvg from "../images/svg/monster/my-piggy.svg"

interface Props {
  children?: React.ReactNode
}

const Thought: React.FC<Props> = ({ children }) => {
  return (
    <div className="bg-homeBg thought-bubble relative m-5 flex min-h-[40px] min-w-[40px] items-center justify-center rounded-[30px] p-5 text-center">
      {children}
    </div>
  )
}

export const StickMan = () => {
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
    <div className="motion-delay-500 motion-duration-2000 motion-opacity-in-0 bg-background group relative z-[180] ml-auto h-[200px] w-[200px] rounded-full shadow-[0px_0px_35px_35px_var(--background)]">
      <div className="pointer-events-none absolute -top-40 right-[100px] w-[500px] pb-[100px] opacity-0 transition-opacity duration-200 group-hover:pointer-events-auto group-hover:opacity-100">
        <Thought>
          <h1 className="relative text-xl leading-8 text-[--text] md:text-center md:text-2xl md:leading-[30px]">
            Hello{" "}
            <span role="img" aria-label="hi">
              👋
            </span>{" "}
            I am Razvan,{" "}
            <span className="text-[--tertiary]">React developer</span> and
            technology enthusiast{" "}
            <span role="img" aria-label="tada">
              🎉
            </span>
          </h1>
        </Thought>
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
