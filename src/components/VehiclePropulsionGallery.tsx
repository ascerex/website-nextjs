"use client";

import {
  type CSSProperties,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "./VehiclePropulsionGallery.module.css";

type ScreeningState =
  | "does-not-advance"
  | "in-screening"
  | "deferred"
  | "prospective";

type ScreeningCard = {
  id: string;
  kind: "family" | "study";
  title: string;
  architecture: string;
  state: ScreeningState;
  stateLabel: string;
  overview: string;
  finding: string;
  nextStep: string;
};

const CLICK_COOLDOWN_MS = 400;
const HOVER_CLICK_COOLDOWN_MS = 500;
const HOVER_START_MS = 200;
const HOVER_REPEAT_MS = 433;
const SCROLL_END_MS = 150;
const EDGE_SELECTION_DELAY_MS = 450;
const PROGRAMMATIC_SCROLL_GUARD_MS = 700;
const SCRAMBLE_CHARACTERS = "!<>-_\\/[]{}—=+*^?#________";

const screeningCards: ScreeningCard[] = [
  {
    id: "ducted-electric-family",
    kind: "family",
    title: "Ducted Electric Fan",
    architecture: "Vectored ducted fan",
    state: "in-screening",
    stateLabel: "In Screening",
    overview: "Electric motors drive fans enclosed by ducts. The ducts may be tilted or the airflow redirected to provide vertical and forward thrust without exposed propellers.",
    finding: "Omega already has a first-pass model for this family, but none of the 11 reviewed hardware records is ready for a complete candidate study. Important source data is missing, some concepts need a different model, and some expose their propulsors.",
    nextStep: "Keep the family in screening while stronger hardware evidence is collected and each candidate is routed to a model that actually represents its installation.",
  },
  {
    id: "cyclorotor-family",
    kind: "family",
    title: "Cyclorotor",
    architecture: "Vectored cyclorotor",
    state: "prospective",
    stateLabel: "Prospective",
    overview: "A cyclorotor uses blades rotating around a horizontal cylinder. Changing blade pitch around that rotation can redirect thrust without tilting the whole aircraft.",
    finding: "The family appears in the research catalogue, but Omega does not yet have a validated cyclorotor model and the available records do not resolve how an Orbiter-scale installation would be contained and packaged.",
    nextStep: "Define the family-specific physics and evidence requirements before any cyclorotor candidate enters vehicle screening.",
  },
  {
    id: "electric-rotor-family",
    kind: "family",
    title: "Electric Rotor Adaptation",
    architecture: "Enclosed rotor study",
    state: "prospective",
    stateLabel: "Prospective",
    overview: "This family covers electrically driven propellers and rotors. For Orbiter, a candidate would need a credible enclosure or another installation that satisfies the no-exposed-propulsor requirement.",
    finding: "Source records identify real electric rotor hardware, but a direct exposed installation is incompatible with the vehicle brief and no bounded enclosed adaptation has completed screening.",
    nextStep: "Only create a candidate study when the containment, airflow, mass, and power consequences of a specific adaptation can be modeled.",
  },
  {
    id: "turbine-rotor-family",
    kind: "family",
    title: "Turbine Rotor Adaptation",
    architecture: "Enclosed rotor study",
    state: "prospective",
    stateLabel: "Prospective",
    overview: "A turbine supplies shaft power to a propeller or rotor instead of producing useful thrust only through a jet exhaust.",
    finding: "The research catalogue identifies the family, but Orbiter still needs a specific contained layout and a model that connects the turbine, transmission, rotor, fuel, heat, and installation losses.",
    nextStep: "Qualify a source-supported packaged concept before evaluating whether its complete installed system can meet the vehicle requirements.",
  },
  {
    id: "ducted-flapping-wing-family",
    kind: "family",
    title: "Ducted Flapping Wing",
    architecture: "Oscillating-wing duct",
    state: "prospective",
    stateLabel: "Prospective",
    overview: "This concept produces airflow with oscillating wing surfaces inside a duct rather than a conventional rotating fan.",
    finding: "The mechanism has been identified for research, but the current workflow has no applicable capability model and does not yet have enough public evidence for an Orbiter-scale installation study.",
    nextStep: "Establish credible force, efficiency, frequency, mass, durability, and scaling inputs before deciding whether to open a candidate branch.",
  },
  {
    id: "fluidic-propulsion-family",
    kind: "family",
    title: "Fluidic Propulsion",
    architecture: "Fluid-amplified thrust",
    state: "prospective",
    stateLabel: "Prospective",
    overview: "Fluidic systems use directed jets and surrounding airflow to create or amplify thrust, often without a conventional propeller visible at the outlet.",
    finding: "Five catalogue records are routed to this family, but their mechanisms and claimed performance are not interchangeable and no common Omega capability model is ready.",
    nextStep: "Separate the mechanisms, qualify their evidence, and model each applicable family before comparing any installation with Orbiter demand.",
  },
  {
    id: "fan-propulsor-family",
    kind: "family",
    title: "Fan Propulsor",
    architecture: "Packaged fan concept",
    state: "prospective",
    stateLabel: "Prospective",
    overview: "This catalogue family groups fan-based systems whose source descriptions do not yet support a more specific propulsion classification or vehicle model.",
    finding: "Four records span different layouts. Their available evidence is not yet sufficient to treat them as one proven architecture or to calculate a complete installed system.",
    nextStep: "Resolve each system's mechanism and topology, then route it to an existing model or define the missing model it requires.",
  },
  {
    id: "plasma-propulsion-family",
    kind: "family",
    title: "Plasma / EHD Research",
    architecture: "Plasma propulsion claim",
    state: "prospective",
    stateLabel: "Prospective",
    overview: "These source-reported concepts claim to accelerate ionized air with electric or electromagnetic fields instead of using a conventional rotor at the thrust outlet.",
    finding: "Three catalogue records use plasma-related claims. That label does not verify a common mechanism, usable thrust, efficiency, or vehicle-scale installation, and rotor or ducted-fan equations do not apply automatically.",
    nextStep: "Verify the mechanism and obtain reproducible force, power, thermal, mass, and scaling evidence before building a family-specific screening model.",
  },
  {
    id: "turbine-jet-family",
    kind: "family",
    title: "Turbine Jet",
    architecture: "Vectored turbine jet",
    state: "prospective",
    stateLabel: "Prospective",
    overview: "A turbine jet produces thrust from accelerated exhaust. A VTOL installation would also need a credible way to redirect or distribute that thrust across the flight envelope.",
    finding: "Three records are classified in this family, but source identification alone does not resolve containment, hot-flow routing, noise, fuel, control authority, or full-vehicle packaging.",
    nextStep: "Define the applicable jet and installation models, then qualify a specific architecture against Orbiter's safety and geometry constraints.",
  },
  {
    id: "magnetic-thruster-family",
    kind: "family",
    title: "Magnetic Thruster Claim",
    architecture: "Linear-thrust claim",
    state: "prospective",
    stateLabel: "Prospective",
    overview: "The catalogue includes one source-described concept claiming linear thrust from a magnetic mechanism rather than a conventional aerodynamic propulsor.",
    finding: "The single record does not yet provide enough mechanism-specific, independently usable evidence to establish an applicable aircraft propulsion model.",
    nextStep: "Keep it in research intake until the claimed force mechanism, energy conversion, scaling, and test evidence can be verified.",
  },
  {
    id: "devt-recovery",
    kind: "study",
    title: "DEVT Recovery Branch",
    architecture: "DEVT recovery study",
    state: "deferred",
    stateLabel: "Deferred",
    overview: "This follow-up study tested whether more fan flow area and lower installed propulsion mass could rescue the source-sized 2021 distributed electric vectored-thrust baseline.",
    finding: "Twenty-nine of 30 bounded cases still failed. The remaining unresolved case left only about 53 kilograms for every other unresolved aircraft system and depended on fan scaling that has not been validated.",
    nextStep: "The branch is deferred. It should reopen only if new hardware evidence supports a materially different, physically realizable fan and installation.",
  },
  {
    id: "devt-baseline",
    kind: "study",
    title: "2021 DEVT Baseline",
    architecture: "DEVT baseline study",
    state: "does-not-advance",
    stateLabel: "Does Not Advance",
    overview: "This was a bounded attempt to adapt a 2021 source-described distributed electric vectored-thrust system: many small ducted fans, electric power, and battery energy.",
    finding: "All 72 configured baseline cases exceeded at least one tested power or mass boundary. In one representative 3,500-pound, 24-fan case, the estimate reached about 2.32 megawatts of installed power and 2,019 kilograms of battery.",
    nextStep: "This source-sized baseline does not advance under the tested assumptions. The result does not reject every ducted-electric or hybrid architecture.",
  },
  {
    id: "m400-static-reference",
    kind: "study",
    title: "M400 Static Reference",
    architecture: "Shaft-driven fan study",
    state: "does-not-advance",
    stateLabel: "Does Not Advance",
    overview: "This diagnostic represented the source-described M400 arrangement as four shaft-driven ducted-fan nacelles to test its literal fit and static force margin against Orbiter constraints.",
    finding: "The source-sized side-by-side layout is about 8.5 feet wide, beyond the eight-foot stowed envelope. At 3,500 pounds, it would use about 97.2 percent of the summed claimed static thrust before installation losses or control margin.",
    nextStep: "The literal source-sized arrangement does not advance. A distinct packaged variant could be reconsidered, but this result does not reject the whole shaft-driven ducted-fan family.",
  },
];

function ScrambleText({
  text,
  trigger,
  speed,
  delay = 0,
}: {
  text: string;
  trigger: number;
  speed: number;
  delay?: number;
}) {
  const [displayedText, setDisplayedText] = useState(text);

  useEffect(() => {
    if (trigger === 0) return;

    let intervalId: number | null = null;
    let cancelled = false;

    const delayId = window.setTimeout(() => {
      let iteration = 0;
      const maxIterations = Math.ceil(text.length * 1.5);

      const tick = () => {
        if (cancelled) return;

        const nextText = text
          .split("")
          .map((character, index) => {
            if (index < iteration / 1.5) return text[index];
            if (character === " ") return " ";
            return SCRAMBLE_CHARACTERS[
              Math.floor(Math.random() * SCRAMBLE_CHARACTERS.length)
            ];
          })
          .join("");

        setDisplayedText(nextText);
        iteration += 1;

        if (iteration >= maxIterations) {
          if (intervalId !== null) {
            window.clearInterval(intervalId);
            intervalId = null;
          }
          setDisplayedText(text);
        }
      };

      // Start immediately when the legacy delay expires instead of waiting
      // one extra interval before the first scrambled frame.
      tick();

      if (!cancelled && maxIterations > 1) {
        intervalId = window.setInterval(tick, speed);
      }
    }, delay);

    return () => {
      cancelled = true;
      window.clearTimeout(delayId);
      if (intervalId !== null) window.clearInterval(intervalId);
    };
  }, [delay, speed, text, trigger]);

  return (
    <span className={styles.scrambleText} aria-label={text}>
      <span aria-hidden="true">{displayedText}</span>
    </span>
  );
}

export function VehiclePropulsionGallery() {
  const trackRef = useRef<HTMLDivElement>(null);
  const expandedRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const currentIndexRef = useRef(0);
  const activeIdRef = useRef<string | null>(null);

  const clickCooldownRef = useRef(false);
  const autoScrollCooldownRef = useRef(false);
  const hoverDirectionRef = useRef<-1 | 0 | 1>(0);

  // A programmatic scroll must not be "corrected" by the manual-scroll snap
  // while its smooth animation is still running.
  const programmaticTargetRef = useRef<number | null>(null);

  const hoverTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scrollTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cooldownTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const autoCooldownTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const edgeSelectionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const detailSwitchTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const programmaticGuardTimerRef =
    useRef<ReturnType<typeof setTimeout> | null>(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [linePosition, setLinePosition] = useState(50);
  const [detailsSwitching, setDetailsSwitching] = useState(false);
  const [scrambleTriggers, setScrambleTriggers] =
    useState<Record<string, number>>({});

  const activeCard =
    screeningCards.find((card) => card.id === activeId) ?? null;

  const setCurrentCardIndex = useCallback((index: number) => {
    const nextIndex = Math.max(
      0,
      Math.min(screeningCards.length - 1, index),
    );
    currentIndexRef.current = nextIndex;
    setCurrentIndex(nextIndex);
    return nextIndex;
  }, []);

  /**
   * Center from the card's actual rendered geometry.
   *
   * This intentionally replaces the old "card width + fixed gap + inferred
   * spacer width" arithmetic. CSS pseudo-spacers, responsive percentages and
   * flex gaps are already represented by offsetLeft/offsetWidth, so using the
   * DOM geometry prevents the carousel from oscillating between two targets.
   */
  const getCardScrollTarget = useCallback((index: number) => {
    const track = trackRef.current;
    const card = cardRefs.current[index];
    if (!track || !card) return 0;

    const maxScroll = Math.max(0, track.scrollWidth - track.clientWidth);
    const centered =
      card.offsetLeft - (track.clientWidth - card.offsetWidth) / 2;

    return Math.max(0, Math.min(maxScroll, centered));
  }, []);

  const getNearestIndex = useCallback(() => {
    const track = trackRef.current;
    if (!track) return currentIndexRef.current;

    let nearestIndex = currentIndexRef.current;
    let nearestDistance = Number.POSITIVE_INFINITY;

    cardRefs.current.forEach((card, index) => {
      if (!card) return;
      const distance = Math.abs(
        track.scrollLeft - getCardScrollTarget(index),
      );

      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestIndex = index;
      }
    });

    return nearestIndex;
  }, [getCardScrollTarget]);

  const releaseProgrammaticScroll = useCallback((target?: number) => {
    if (
      target !== undefined &&
      programmaticTargetRef.current !== target
    ) {
      return;
    }

    programmaticTargetRef.current = null;

    if (programmaticGuardTimerRef.current) {
      clearTimeout(programmaticGuardTimerRef.current);
      programmaticGuardTimerRef.current = null;
    }
  }, []);

  const scrollToCard = useCallback(
    (index: number, behavior: ScrollBehavior = "smooth") => {
      const track = trackRef.current;
      if (!track) return;

      const nextIndex = setCurrentCardIndex(index);
      const target = getCardScrollTarget(nextIndex);

      if (behavior === "smooth") {
        programmaticTargetRef.current = nextIndex;

        if (programmaticGuardTimerRef.current) {
          clearTimeout(programmaticGuardTimerRef.current);
        }

        // Fallback release for browsers that do not give us a final scroll
        // event exactly at the target.
        programmaticGuardTimerRef.current = setTimeout(() => {
          releaseProgrammaticScroll(nextIndex);
        }, PROGRAMMATIC_SCROLL_GUARD_MS);
      } else {
        releaseProgrammaticScroll();
      }

      track.scrollTo({ left: target, behavior });
    },
    [
      getCardScrollTarget,
      releaseProgrammaticScroll,
      setCurrentCardIndex,
    ],
  );

  const moveOneCard = useCallback(
    (direction: -1 | 1) => {
      const nearestIndex = Math.max(
        0,
        Math.min(screeningCards.length - 1, getNearestIndex()),
      );
      const nextIndex = Math.max(
        0,
        Math.min(
          screeningCards.length - 1,
          nearestIndex + direction,
        ),
      );

      if (nextIndex === nearestIndex) return false;

      scrollToCard(nextIndex);
      return true;
    },
    [getNearestIndex, scrollToCard],
  );

  const updateLinePosition = useCallback((cardId: string) => {
    const expanded = expandedRef.current;
    const cardIndex = screeningCards.findIndex(
      (card) => card.id === cardId,
    );
    const card = cardRefs.current[cardIndex];

    if (!expanded || !card) return;

    const cardRect = card.getBoundingClientRect();
    const expandedRect = expanded.getBoundingClientRect();
    if (expandedRect.width === 0) return;

    const cardCenter =
      cardRect.left + cardRect.width / 2 - expandedRect.left;

    setLinePosition(
      Math.max(
        5,
        Math.min(95, (cardCenter / expandedRect.width) * 100),
      ),
    );
  }, []);

  const cancelEdgeSelection = useCallback(() => {
    if (edgeSelectionTimerRef.current) {
      clearTimeout(edgeSelectionTimerRef.current);
      edgeSelectionTimerRef.current = null;
    }
  }, []);

  const closeExpanded = useCallback(() => {
    if (detailSwitchTimerRef.current) {
      clearTimeout(detailSwitchTimerRef.current);
      detailSwitchTimerRef.current = null;
    }

    setDetailsSwitching(false);
    activeIdRef.current = null;
    setActiveId(null);
  }, []);

  const showExpanded = useCallback(
    (cardId: string) => {
      const switchingCards = Boolean(
        activeIdRef.current && activeIdRef.current !== cardId,
      );

      if (detailSwitchTimerRef.current) {
        clearTimeout(detailSwitchTimerRef.current);
      }

      if (switchingCards) setDetailsSwitching(true);

      activeIdRef.current = cardId;
      setActiveId(cardId);

      // Wait for React to commit data-active/content before measuring the
      // connector. Two animation frames keeps the line tied to the final card
      // position without visually delaying the details.
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => updateLinePosition(cardId));
      });

      if (switchingCards) {
        detailSwitchTimerRef.current = setTimeout(() => {
          setDetailsSwitching(false);
          detailSwitchTimerRef.current = null;
        }, 50);
      }
    },
    [updateLinePosition],
  );

  const cardIsVisible = useCallback(
    (index: number, fully: boolean) => {
      const track = trackRef.current;
      const card = cardRefs.current[index];

      if (!track || !card) return false;

      const trackRect = track.getBoundingClientRect();
      const cardRect = card.getBoundingClientRect();

      if (fully) {
        const tolerance = 10;
        return (
          cardRect.left >= trackRect.left - tolerance &&
          cardRect.right <= trackRect.right + tolerance
        );
      }

      const center = cardRect.left + cardRect.width / 2;
      const buffer = 50;
      return (
        center > trackRect.left - buffer &&
        center < trackRect.right + buffer
      );
    },
    [],
  );

  function beginHoverAdvance(direction: -1 | 1) {
    if (clickCooldownRef.current) return;

    if (
      (direction === -1 && currentIndexRef.current === 0) ||
      (direction === 1 &&
        currentIndexRef.current === screeningCards.length - 1)
    ) {
      return;
    }

    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);

    hoverTimerRef.current = setTimeout(() => {
      if (
        clickCooldownRef.current ||
        hoverDirectionRef.current !== direction
      ) {
        return;
      }

      moveOneCard(direction);
      autoScrollCooldownRef.current = true;

      if (autoCooldownTimerRef.current) {
        clearTimeout(autoCooldownTimerRef.current);
      }

      autoCooldownTimerRef.current = setTimeout(() => {
        autoScrollCooldownRef.current = false;
      }, HOVER_CLICK_COOLDOWN_MS);

      hoverTimerRef.current = setTimeout(() => {
        const canContinue =
          (direction === 1 &&
            hoverDirectionRef.current === 1 &&
            currentIndexRef.current <
              screeningCards.length - 1) ||
          (direction === -1 &&
            hoverDirectionRef.current === -1 &&
            currentIndexRef.current > 0);

        if (!clickCooldownRef.current && canContinue) {
          beginHoverAdvance(direction);
        }
      }, HOVER_REPEAT_MS);
    }, HOVER_START_MS);
  }

  const handleNavClick = (direction: -1 | 1) => {
    cancelEdgeSelection();

    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);

    if (autoScrollCooldownRef.current) {
      autoScrollCooldownRef.current = false;
      hoverDirectionRef.current = 0;
      clickCooldownRef.current = true;

      if (cooldownTimerRef.current) {
        clearTimeout(cooldownTimerRef.current);
      }

      cooldownTimerRef.current = setTimeout(() => {
        clickCooldownRef.current = false;
      }, 100);

      return;
    }

    moveOneCard(direction);
    clickCooldownRef.current = true;

    if (cooldownTimerRef.current) {
      clearTimeout(cooldownTimerRef.current);
    }

    cooldownTimerRef.current = setTimeout(() => {
      clickCooldownRef.current = false;
    }, CLICK_COOLDOWN_MS);
  };

  const handleNavEnter = (direction: -1 | 1) => {
    const isTouchDevice =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;

    if (isTouchDevice) return;

    hoverDirectionRef.current = direction;
    beginHoverAdvance(direction);
  };

  const handleNavLeave = () => {
    hoverDirectionRef.current = 0;

    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
    }
  };

  const handleCardClick = (card: ScreeningCard, index: number) => {
    cancelEdgeSelection();

    if (activeIdRef.current === card.id) {
      closeExpanded();
      return;
    }

    if (!cardIsVisible(index, true)) {
      // We know exactly which edge card was clicked. Center that card
      // directly rather than deriving "next/previous" from a scroll position
      // that is itself currently moving.
      scrollToCard(index);

      edgeSelectionTimerRef.current = setTimeout(() => {
        edgeSelectionTimerRef.current = null;
        showExpanded(card.id);
      }, EDGE_SELECTION_DELAY_MS);

      return;
    }

    showExpanded(card.id);
  };

  const handleCardHover = (cardId: string) => {
    setScrambleTriggers((current) => ({
      ...current,
      [cardId]: (current[cardId] ?? 0) + 1,
    }));
  };

  const handleTrackScroll = () => {
    if (scrollTimerRef.current) {
      clearTimeout(scrollTimerRef.current);
    }

    const selectedId = activeIdRef.current;

    if (selectedId) {
      const selectedIndex = screeningCards.findIndex(
        (card) => card.id === selectedId,
      );

      if (cardIsVisible(selectedIndex, false)) {
        updateLinePosition(selectedId);
      } else {
        closeExpanded();
      }
    }

    scrollTimerRef.current = setTimeout(() => {
      const nearestIndex = Math.max(
        0,
        Math.min(screeningCards.length - 1, getNearestIndex()),
      );

      const programmaticTarget = programmaticTargetRef.current;

      // Critical race fix:
      // a smooth scroll initiated by nav/edge selection is already headed
      // toward a known card. Do not launch another smooth scroll at 150 ms.
      if (programmaticTarget !== null) {
        if (nearestIndex === programmaticTarget) {
          setCurrentCardIndex(programmaticTarget);
          releaseProgrammaticScroll(programmaticTarget);
        }
        return;
      }

      if (hoverDirectionRef.current !== 0) return;

      // Manual wheel/trackpad/touch scrolling keeps the legacy 150 ms snap.
      scrollToCard(nearestIndex);
    }, SCROLL_END_MS);
  };

  useEffect(() => {
    const initializeId = window.setTimeout(
      () => scrollToCard(0, "auto"),
      100,
    );

    const handleResize = () => {
      scrollToCard(currentIndexRef.current, "auto");

      if (activeIdRef.current) {
        window.requestAnimationFrame(() => {
          if (activeIdRef.current) {
            updateLinePosition(activeIdRef.current);
          }
        });
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.clearTimeout(initializeId);
      window.removeEventListener("resize", handleResize);

      [
        hoverTimerRef,
        scrollTimerRef,
        cooldownTimerRef,
        autoCooldownTimerRef,
        edgeSelectionTimerRef,
        detailSwitchTimerRef,
        programmaticGuardTimerRef,
      ].forEach((timerRef) => {
        if (timerRef.current) clearTimeout(timerRef.current);
      });
    };
  }, [scrollToCard, updateLinePosition]);

  const lineStyle = {
    "--line-position": `${linePosition}%`,
  } as CSSProperties;

  return (
    <div className={styles.gallery}>
      <nav className={styles.recordIndex} aria-label="Jump to propulsion records">
        {(["family", "study"] as const).map((kind) => (
          <button
            key={kind}
            type="button"
            onClick={() => {
              handleNavLeave();
              cancelEdgeSelection();
              closeExpanded();
              scrollToCard(screeningCards.findIndex((card) => card.kind === kind));
            }}
          >
            <strong>{screeningCards.filter((card) => card.kind === kind).length}</strong>
            <span>{kind === "family" ? "Research families" : "Computational studies"}</span>
            <span aria-hidden="true">↗</span>
          </button>
        ))}
      </nav>
      <div className={styles.carousel}>
        <button
          type="button"
          className={`${styles.navField} ${styles.navLeft}`}
          aria-label="Previous propulsion architecture"
          aria-disabled={currentIndex === 0}
          onClick={() => handleNavClick(-1)}
          onMouseEnter={() => handleNavEnter(-1)}
          onMouseLeave={handleNavLeave}
        >
          <svg
            className={styles.navArrow}
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <polyline points="15,18 9,12 15,6" />
          </svg>
        </button>

        <button
          type="button"
          className={`${styles.navField} ${styles.navRight}`}
          aria-label="Next propulsion architecture"
          aria-disabled={
            currentIndex === screeningCards.length - 1
          }
          onClick={() => handleNavClick(1)}
          onMouseEnter={() => handleNavEnter(1)}
          onMouseLeave={handleNavLeave}
        >
          <svg
            className={styles.navArrow}
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <polyline points="9,18 15,12 9,6" />
          </svg>
        </button>

        <div className={styles.trackFrame}>
          <div
            ref={trackRef}
            className={styles.track}
            aria-label="Propulsion architecture screening records"
            onScroll={handleTrackScroll}
          >
            {screeningCards.map((card, index) => {
              const selected = card.id === activeId;
              const trigger = scrambleTriggers[card.id] ?? 0;

              return (
                <button
                  key={card.id}
                  ref={(element) => {
                    cardRefs.current[index] = element;
                  }}
                  type="button"
                  className={styles.card}
                  data-status={card.state}
                  data-active={selected || undefined}
                  aria-expanded={selected}
                  aria-controls="propulsion-screening-details"
                  onClick={() => handleCardClick(card, index)}
                  onMouseEnter={() => handleCardHover(card.id)}
                  onFocus={() => handleCardHover(card.id)}
                >
                  <span
                    className={styles.cardCorners}
                    aria-hidden="true"
                  />
                  <span className={styles.recordKind}>
                    {card.kind === "family" ? "Propulsion family" : "Computational study"}
                  </span>
                  <span className={styles.cardInner}>
                    <span className={styles.cardTitle}>
                      {card.title}
                    </span>
                  </span>
                  <span className={styles.cardReveal}>
                    <span className={styles.cardType}>
                      <ScrambleText
                        text={card.architecture}
                        trigger={trigger}
                        speed={15}
                      />
                    </span>
                    <span className={styles.cardStatus}>
                      <ScrambleText
                        text={card.stateLabel}
                        trigger={trigger}
                        speed={20}
                        delay={100}
                      />
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div
        ref={expandedRef}
        id="propulsion-screening-details"
        className={styles.expandedWrapper}
        data-open={Boolean(activeCard) || undefined}
        data-status={activeCard?.state}
        data-switching={detailsSwitching || undefined}
        aria-hidden={!activeCard}
        style={lineStyle}
      >
        <div className={styles.expandedContent}>
          <span className={styles.expandedLine} aria-hidden="true" />

          {activeCard ? (
            <section
              key={activeCard.id}
              className={styles.expandedBody}
              aria-live="polite"
            >
              <header className={styles.expandedHeader}>
                <h3>{activeCard.title}</h3>
                <div className={styles.expandedMeta}>
                  <span>{activeCard.kind === "family" ? "Propulsion family" : "Computational study"}</span>
                  <span>{activeCard.architecture}</span>
                  <strong>{activeCard.stateLabel}</strong>
                </div>
              </header>

              <dl className={styles.expandedDetails}>
                <div>
                  <dt>Evaluation summary</dt>
                  <dd>{activeCard.overview}</dd>
                </div>
                <div>
                  <dt>Evidence represented</dt>
                  <dd>{activeCard.finding}</dd>
                </div>
                <div>
                  <dt>Takeaway</dt>
                  <dd>{activeCard.nextStep}</dd>
                </div>
              </dl>
            </section>
          ) : null}
        </div>
      </div>
    </div>
  );
}
