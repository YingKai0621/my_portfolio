# Motion specification

Motion should feel calm, deliberate and responsive. Prefer transform/opacity and avoid layout thrashing. Default durations: press 120ms, hover 200ms, standard transition 280ms, reveal 500–700ms, stagger 60–90ms. Easing default cubic-bezier(.22,1,.36,1); use low-bounce spring for dock only. Tune with browser review, not arbitrary animation count.

| Scene | Trigger / choreography | Constraints |
|---|---|---|
| Hero (P2 V3) | first paint is the complete poster; on hydration, name, role copy and profile links settle through subtle scale/vertical travel; the portrait motion branch activates only when an approved `.poster-portrait-asset` exists; manual replay control; official Isometric Cubes keep their existing pointer ripples | no placeholder portrait, loading gate or hidden essential copy; only transform/opacity, no perpetual typography loop, reduced motion stays static, replay control is hidden without JS or with reduced motion |
| Dock | pointer proximity magnification, anchor navigation, active section change | keyboard and touch equal functionality, scroll offsets, no hover-only navigation |
| About | one-time reveal on entry; fanned cards on hover/focus/tap | accessible role labels, visible description independent of cards |
| Impact | count once when in view, final value always available to assistive tech | no rapid live announcements; no animation of unverified values |
| Projects | static editorial rows; Following Pointer label appears only over artwork for fine mouse pointers | no carousel movement in the main showcase; native case-study links remain keyboard/touch accessible |
| Research/Skills | subtle reveal; optional animated beam as decorative illustration | textual equivalent, no continuous loops required |
| Journey | timeline progress on scroll; badge expansion on action | semantic chronological list always readable |
| Lab | genuine user-triggered interaction; Comic Text success feedback | no surprise sound, no strobing |
| Contact | slow Vortex only near viewport | low density, pause hidden/offscreen, static gradient fallback |
| Later intro polish (P9) | only refine the approved P2 poster reveal if owner feedback calls for it | never mandatory; no external game visuals, purchased source, or additional blocking sequence |

Reduced motion: respect prefers-reduced-motion globally; render static cubes, nonrotating role text, final metric values, no parallax/scroll smoothing/particle loops and instant navigation. Provide pause/stop for continuously moving content as appropriate. Touch: disable pointer tracking, hover-based lift and custom cursor; touch-friendly tap targets. Offscreen/background-tab animations pause; clean up observers/RAF/timers. Test visual stability, frame pacing and input latency on mobile and desktop. No claims of smoothness without observation.

## Color consistency
Use shared design tokens for all animated surfaces, particles, glows, pointer effects and highlights. The dominant accent is Glacier Blue; keep resting states neutral and avoid full-screen bright cyan or legacy purple effects.
