import { Float, PerspectiveCamera, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { gsap } from "gsap";
import { useLayoutEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { Euler, Group, Vector3 } from "three";
import { fadeOnBeforeCompile } from "../utils/fadeMaterial";
import { Airplane } from "./Airplane";
import { Background } from "./Background";
import { Stars } from "./Stars";
import { Cloud } from "./Cloud";
import { TextSection } from "./TextSection";

const LINE_NB_POINTS = 1000
//for better curve
const CURVE_DISTANCE =250
//small values
const CURVE_AHEAD_CAMERA = 0.008
const CURVE_AHEAD_AIRPLANE = 0.02

const AIRPLANE_MAX_ANGLE =35

const FRICTION_DISTANCE = 42

export const Experience = () => {

  const curvePoints = useMemo(
    ()=> [
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, 0, -CURVE_DISTANCE),
      new THREE.Vector3(100, 0, -2 * CURVE_DISTANCE),
      new THREE.Vector3(-100, 0, -3 * CURVE_DISTANCE),
      new THREE.Vector3(100, 0, -4 * CURVE_DISTANCE),
      new THREE.Vector3(0, 0, -5 * CURVE_DISTANCE),
      new THREE.Vector3(0, 0, -6 * CURVE_DISTANCE),
      new THREE.Vector3(0, 0, -7 * CURVE_DISTANCE),
  ]
  ,[])

  // add curve line
  const curve = useMemo(()=>{
    return new THREE.CatmullRomCurve3(
    curvePoints,
    false,
    "catmullrom",
    0.5)
  }, [])

  //text section array with useMemo
  const textSections = useMemo(() => [
    {
      cameraRailDist: -1,
      position: new Vector3(
        curvePoints[1].x - 3,
        curvePoints[1].y,
        curvePoints[1].z
      ),
      subtitle: `Welcome to the Cosmos,
      Where mysteries unfold in the vastness of space!`,
    },
    {
      cameraRailDist: 1.5,
      position: new Vector3(
        curvePoints[2].x + 2,
        curvePoints[2].y,
        curvePoints[2].z
      ),
      title: "Stellar Discoveries",
      subtitle: `Unveil the secrets of distant stars and galaxies
      through the lens of React Three Fiber!`,
    },
    {
      cameraRailDist: -1,
      position: new Vector3(
        curvePoints[3].x - 3,
        curvePoints[3].y,
        curvePoints[3].z
      ),
      title: "Journey to the Unknown",
      subtitle: `Embark on an exhilarating voyage through 
      the universe with React Three Fiber!`,
    },
    {
      cameraRailDist: 1.5,
      position: new Vector3(
        curvePoints[4].x + 3.5,
        curvePoints[4].y,
        curvePoints[4].z - 12
      ),
      title: "Astronomy Unveiled",
      subtitle: `Explore the wonders of celestial bodies and cosmic phenomena 
      with React Three Fiber.`,
    },
  ], []);
  

  //clouds
  const clouds = useMemo(()=>[
    //use the curve points to position the clouds and add rotations
    // STARTING
    {
      position: new Vector3(-3.5, 3.2, -7),
    },
    {
      position: new Vector3(0, -4, -10),
    },
    {
      scale: new Vector3(4, 4, 4),
      position: new Vector3(-28, -5, -68),
      rotation: new Euler(-Math.PI / 5, Math.PI / 6, 0),
    },
    {
      scale: new Vector3(4, 4, 4),
      position: new Vector3(28, -4, -58),
    },
    // FIRST POINT
    {
      scale: new Vector3(4, 4, 4),
      position: new Vector3(
        curvePoints[1].x + 10,
        curvePoints[1].y - 4,
        curvePoints[1].z + 64
      ),
    },
    {
      scale: new Vector3(3, 3, 3),
      position: new Vector3(
        curvePoints[1].x - 20,
        curvePoints[1].y + 4,
        curvePoints[1].z + 28
      ),
      rotation: new Euler(0, Math.PI / 7, 0),
    },
    {
      rotation: new Euler(0, Math.PI / 7, Math.PI / 5),
      scale: new Vector3(5, 5, 5),
      position: new Vector3(
        curvePoints[1].x - 13,
        curvePoints[1].y + 4,
        curvePoints[1].z - 62
      ),
    },
    {
      rotation: new Euler(Math.PI / 2, Math.PI / 2, Math.PI / 3),
      scale: new Vector3(5, 5, 5),
      position: new Vector3(
        curvePoints[1].x + 54,
        curvePoints[1].y + 2,
        curvePoints[1].z - 82
      ),
    },
    {
      scale: new Vector3(5, 5, 5),
      position: new Vector3(
        curvePoints[1].x + 8,
        curvePoints[1].y - 14,
        curvePoints[1].z - 22
      ),
    },
    // SECOND POINT
    {
      scale: new Vector3(3, 3, 3),
      position: new Vector3(
        curvePoints[2].x + 6,
        curvePoints[2].y - 7,
        curvePoints[2].z + 50
      ),
    },
    {
      scale: new Vector3(2, 2, 2),
      position: new Vector3(
        curvePoints[2].x - 2,
        curvePoints[2].y + 4,
        curvePoints[2].z - 26
      ),
    },
    {
      scale: new Vector3(4, 4, 4),
      position: new Vector3(
        curvePoints[2].x + 12,
        curvePoints[2].y + 1,
        curvePoints[2].z - 86
      ),
      rotation: new Euler(Math.PI / 4, 0, Math.PI / 3),
    },
    // THIRD POINT
    {
      scale: new Vector3(3, 3, 3),
      position: new Vector3(
        curvePoints[3].x + 3,
        curvePoints[3].y - 10,
        curvePoints[3].z + 50
      ),
    },
    {
      scale: new Vector3(3, 3, 3),
      position: new Vector3(
        curvePoints[3].x - 10,
        curvePoints[3].y,
        curvePoints[3].z + 30
      ),
      rotation: new Euler(Math.PI / 4, 0, Math.PI / 5),
    },
    {
      scale: new Vector3(4, 4, 4),
      position: new Vector3(
        curvePoints[3].x - 20,
        curvePoints[3].y - 5,
        curvePoints[3].z - 8
      ),
      rotation: new Euler(Math.PI, 0, Math.PI / 5),
    },
    {
      scale: new Vector3(5, 5, 5),
      position: new Vector3(
        curvePoints[3].x + 0,
        curvePoints[3].y - 5,
        curvePoints[3].z - 98
      ),
      rotation: new Euler(0, Math.PI / 3, 0),
    },
    // FOURTH POINT
    {
      scale: new Vector3(2, 2, 2),
      position: new Vector3(
        curvePoints[4].x + 3,
        curvePoints[4].y - 10,
        curvePoints[4].z + 2
      ),
    },
    {
      scale: new Vector3(3, 3, 3),
      position: new Vector3(
        curvePoints[4].x + 24,
        curvePoints[4].y - 6,
        curvePoints[4].z - 42
      ),
      rotation: new Euler(Math.PI / 4, 0, Math.PI / 5),
    },
    {
      scale: new Vector3(3, 3, 3),
      position: new Vector3(
        curvePoints[4].x - 4,
        curvePoints[4].y + 9,
        curvePoints[4].z - 62
      ),
      rotation: new Euler(Math.PI / 3, 0, Math.PI / 3),
    },
    // FINAL
    {
      scale: new Vector3(3, 3, 3),
      position: new Vector3(
        curvePoints[7].x + 12,
        curvePoints[7].y - 5,
        curvePoints[7].z + 60
      ),
      rotation: new Euler(-Math.PI / 4, -Math.PI / 6, 0),
    },
    {
      scale: new Vector3(3, 3, 3),
      position: new Vector3(
        curvePoints[7].x - 12,
        curvePoints[7].y + 5,
        curvePoints[7].z + 120
      ),
      rotation: new Euler(Math.PI / 4, Math.PI / 6, 0),
    },
    {
      scale: new Vector3(4, 4, 4),
      position: new Vector3(
        curvePoints[7].x,
        curvePoints[7].y,
        curvePoints[7].z
      ),
      rotation: new Euler(0, 0, 0),
    },
  ], [])

  //construct line shape from 0.2 to -0.2
const shape = useMemo(()=>{
    const shape = new THREE.Shape()
    shape.moveTo(0, -0.08)
    shape.lineTo(0, 0.08)
    return shape;
  }, [curve])


  //SCROLLING ANIMATION

  //scroll animation
  const cameraGroup = useRef();
  const cameraRail = useRef()
  const scroll = useScroll();

  //slow when we get closure to the text section
  const lastScroll = useRef(0);

  //camera position depend on scroll and line
  useFrame((_state, delta )=> {

    //to avoid having a negative value
    const scrollOffset= Math.max(0, scroll.offset)
    let friction = 1;
    let resetCameraRail = true

    //look to close text sections
    textSections.forEach((textSection) =>{
      const distance = textSection.position.distanceTo(
        cameraGroup.current.position
        )

      if(distance < FRICTION_DISTANCE){
        //min value is 0.1
        friction = Math.max(distance/ FRICTION_DISTANCE, 0.1)
        const targetCameraRailPosition = new Vector3(
          (1 - distance/ FRICTION_DISTANCE) * textSection.cameraRailDist,
          0,
          0
        )
        cameraRail.current.position.lerp(targetCameraRailPosition, delta)
        resetCameraRail =false
      }
    })

    //to reset the camera at the center after the animation when we have a text
    if(resetCameraRail){
      const targetCameraRailPosition = new Vector3(0, 0, 0)
      cameraRail.current.position.lerp(targetCameraRailPosition, delta)
    }

    //calcuate lerped scroll offset
    let lerpedScrollOffset = THREE.MathUtils.lerp(
      lastScroll.current , 
      scrollOffset, 
      delta* friction)
    
    //protect below 0 and above 1 (we only want values between 0 and 1)
    lerpedScrollOffset = Math.min(lerpedScrollOffset, 1)
    lerpedScrollOffset = Math.max(lerpedScrollOffset, 0)
    lastScroll.current = lerpedScrollOffset

    //colors based on the lerp scroll offset
    /**
     * seek() method takes a time value as its argument
     * the time value is determined by multiplying the 
     * lerpedScrollOffset by the total duration of the timeline 
     * (tl.current.duration())
     * 
     */
    tl.current.seek(lerpedScrollOffset* tl.current.duration())

    //calculate current Point of the line based on scroll offset
    const curPoint = curve.getPoint(lerpedScrollOffset)

    //to follow the curve points
    cameraGroup.current.position.lerp(curPoint, delta*24)

    // make the group look ahead on the curve

    const lookAtPoint = curve.getPoint(
      Math.min(lerpedScrollOffset + CURVE_AHEAD_CAMERA, 1))
    
    const currentLookAt = cameraGroup.current.getWorldDirection(
      new THREE.Vector3()
    )
    const targetLookAt = new THREE.Vector3()
    .subVectors(curPoint, lookAtPoint)
    .normalize()

    const lookAt = currentLookAt.lerp(targetLookAt, delta *24)
    cameraGroup.current.lookAt(
      cameraGroup.current.position.clone().add(lookAt)
    )

    //airplane rotation

    const tangent = curve.getTangent(lerpedScrollOffset + CURVE_AHEAD_AIRPLANE)

    const nonLerpLookAt = new Group();
    nonLerpLookAt.position.copy(curPoint)
    nonLerpLookAt.lookAt(nonLerpLookAt.position.clone().add(targetLookAt))

    tangent.applyAxisAngle(
      new THREE.Vector3(0, 1, 0),
      - nonLerpLookAt.rotation.y
    )


    let angle = Math.atan2(- tangent.z, tangent.x)
    angle = -Math.PI /2 + angle

    let angleDegrees =( angle *180 ) / Math.PI
    angleDegrees *= 2.4

    //limit plane angle 
    if(angleDegrees< 0){
      angleDegrees = Math.max(angleDegrees, -AIRPLANE_MAX_ANGLE)
    }
    if(angleDegrees> 0){
      angleDegrees = Math.min(angleDegrees, AIRPLANE_MAX_ANGLE)
    }

    //set back angle

    angle = (angleDegrees * Math.PI )/180

    const targetAirplaneQuaternion = new THREE.Quaternion().setFromEuler(
      new THREE.Euler(
        airplane.current.rotation.x,
        airplane.current.rotation.y,
        angle
      )
    )
    airplane.current.quaternion.slerp(targetAirplaneQuaternion, delta*2)
  })

  const airplane = useRef()
  const tl = useRef()

  const backgroundColors = useRef({
    colorA : "#3835ca",
    colorB : "#cac9f8"
  })

  /**
   * useLayoutEffect hook is similar to useEffect 
   * but runs synchronously after all DOM mutations.
   * 
   * gsap library is a JavaScript animation library 
   * that allows for smooth and responsive animations.
   * 
   * The tl.current object creates a sequence of 
   * animations to be performed on the backgroundColors.current 
   * variable. The backgroundColors variable is 
   * presumably a reference to a CSS color gradient or 
   * background that will be animated.
   * 
   */
  useLayoutEffect(() => {
    tl.current = gsap.timeline();
    tl.current.to(backgroundColors.current, {
        duration: 1,
        colorA: "#000033",  // dark blue
        colorB: "#333399",  // light blue
    });
    tl.current.to(backgroundColors.current, {
        duration: 1,
        colorA: "#77769A",  // black
        colorB: "#ffffff",  // white
    });
    tl.current.to(backgroundColors.current, {
        duration: 1,
        colorA: "#111144",  // another shade of dark blue
        colorB: "#6666ff",  // another shade of light blue
    });
}, []);

return (
  <>
      <directionalLight position={[0, 3, 1]} intensity={0.1} />
      <Stars /> 
      <group ref={cameraGroup}>
          <Background backgroundColors={backgroundColors} />
          <group ref={cameraRail}>
              <PerspectiveCamera position={[0, 0, 5]} fov={30} makeDefault />
          </group>
          <group ref={airplane}>
              <Float 
                  floatIntensity={1}
                  speed={0.5}
                  rotationIntensity={0.5}
              >
                  <Airplane 
                      scale={[0.2, 0.2, 0.2]}
                      position-y={-20}       
                      position-x={-2}       
                      position-z={-198} 
                  />        
              </Float>
          </group>
      </group>
      {textSections.map((textSection, index) => (
          <TextSection {...textSection} key={index} />
      ))}
      {clouds.map((cloud, index) => (
          <Cloud {...cloud} key={index} />
      ))}
  </>
);
};
