import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import heartSound from "./heartBeat.wav";

export default function ValentineCard() {
  const [clicked, setClicked] = useState(false);
  const [hearts, setHearts] = useState([]);
  const [confetti, setConfetti] = useState([]);
  const [isBlurred, setIsBlurred] = useState(false);
  const [message, setMessage] = useState("");
  const [buttonGradient, setButtonGradient] = useState("linear-gradient(to right, #ff0000, #ffc0cb)");
  const [borderColor, setBorderColor] = useState("#ff0000");
  const [h1FontSize, setH1FontSize] = useState("3rem"); // Изначальный размер шрифта
  const heartIdsRef = useRef(new Set());
  const audioRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 600) {
        setH1FontSize("2.5rem");
      } else if (window.innerWidth <= 400) {
        setH1FontSize("2rem");
      } else {
        setH1FontSize("3rem");
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Инициализация при загрузке

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const initialHearts = Array.from({ length: 15 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * (window.innerWidth - 30),
      y: Math.random() * (window.innerHeight - 30),
    }));
    setHearts(initialHearts);
    initialHearts.forEach((heart) => heartIdsRef.current.add(heart.id));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const newHearts = Array.from({ length: 15 }, (_, i) => ({
        id: Date.now() + i,
        x: Math.random() * (window.innerWidth - 30),
        y: Math.random() * (window.innerHeight - 30),
      }));
      setHearts((prevHearts) => {
        const idsToRemove = new Set(prevHearts.map((heart) => heart.id));
        const updatedHearts = [...prevHearts, ...newHearts].filter(
          (heart) => !idsToRemove.has(heart.id)
        );
        newHearts.forEach((heart) => heartIdsRef.current.add(heart.id));
        return updatedHearts;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const addConfetti = useCallback(() => {
    const newConfetti = Array.from({ length: 200 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 10 + 5,
      angle: Math.random() * 360,
    }));
    setConfetti(newConfetti);
  }, []);

  useEffect(() => {
    if (clicked) {
      setIsBlurred(true);
      addConfetti();
      audioRef.current.play();
      const messages = [
        "Я тебя люблю! 💕",
        "Ты лучший человек, кого я знаю! ",
        "С тобой каждый день становится лучше! 😊",
        "Ты моя настоящая героиня! 🦸‍♂️🦸‍♀️",
        "Твоя улыбка освещает мой день! ☀️",
        "Ты моё солнышко в пасмурный день! 🌞",
        "Каждое мгновение с тобой — бесценно! 💖",
        "Ты делаешь этот мир ярче! ✨",
        "Моя жизнь стала волшебной благодаря тебе! 🪄",
        "Ты мой идеальный человек! 💑",
        "Без тебя этот мир был бы пустым! 🌍❤️",
        "Ты моё самое большое счастье! 🎉",
        "С тобой все мечты становятся реальностью! ",
        "Я хочу провести с тобой вечность! ⏳💕",
        "Ты даришь мне радость каждый день! 😊",
        "Ты мой уют и моя любовь! 🏡❤️",
        "Твоя любовь — моё самое большое сокровище! 💎",
        "Ты — мой источник вдохновения! 🎨✨",
        "Твои объятия — самое тёплое место на Земле! 🤗",
        "Я благодарен судьбе за тебя! 🍀",
        "Ты делаешь меня самым счастливым человеком! 😍",
        "Ты лучшее, что могло со мной случиться! 💘",
        "Я хочу быть рядом с тобой всегда! 🔗💕",
        "Ты наполняешь моё сердце любовью! ❤️",
        "Ты мой ангел-хранитель! 👼💕",
      ];

      const randomMessage =
        messages[Math.floor(Math.random() * messages.length)];
      setMessage(randomMessage);

      // Изменяем цвет градиента и рамки
      const newGradientColor1 = `hsl(${Math.random() * 360}, 100%, 50%)`;
      const newGradientColor2 = `hsl(${Math.random() * 360}, 100%, 50%)`;
      const newBorderColor = `hsl(${Math.random() * 360}, 100%, 50%)`;

      setButtonGradient(`linear-gradient(to right, ${newGradientColor1}, ${newGradientColor2})`);
      setBorderColor(newBorderColor);

      const blurTimeout = setTimeout(() => {
        setIsBlurred(false);
      }, 1000);

      const confettiTimeout = setTimeout(() => {
        setConfetti([]);
      }, 3000);

      return () => {
        clearTimeout(blurTimeout);
        clearTimeout(confettiTimeout);
      };
    }
  }, [clicked, addConfetti]);

  const Heart = ({ id, x, y }) => (
    <motion.svg
      key={id}
      className="heart"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="#ff0000"
      style={{
        position: "absolute",
        top: `${y}px`,
        left: `${x}px`,
        width: "3rem",
        height: "3rem",
        zIndex: 1,
      }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{
        opacity: 1,
        scale: [1, 1.1, 1, 1.1, 1, 1.1, 1, 1.1, 1, 1.1, 1],
      }}
      exit={{ opacity: 0, scale: 0.5, x: Math.random() * 100 - 50, y: -100 }}
      transition={{ duration: 2, ease: "easeInOut" }}
    >
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </motion.svg>
  );

  const Confetti = ({ id, x, y, size, angle }) => (
    <motion.div
      key={id}
      className="confetti"
      style={{
        position: "absolute",
        top: `${y}px`,
        left: `${x}px`,
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: `hsl(${Math.random() * 360}, 100%, 50%)`,
        borderRadius: "50%",
        zIndex: 1,
      }}
      initial={{ y, x, rotate: angle }}
      animate={{
        y: y - 200,
        x: x + Math.random() * 100 - 50,
        rotate: angle + 360,
      }}
      transition={{ duration: 5, ease: "easeOut" }}
      exit={{ opacity: 0 }}
    />
  );

  return (
    <div
      className="valentine-card"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "97vh",
        backgroundColor: "#ffebf0",
        backgroundImage: "radial-gradient(circle, #ffebf0, #ffc0cb)",
        overflow: "hidden",
        position: "relative",
        transition: "filter 0.5s",
        filter: isBlurred ? "blur(5px)" : "none",
        padding: "1rem", // Добавлено для отступов на маленьких экранах
      }}
    >
      <audio ref={audioRef} src={heartSound} />

      <AnimatePresence>
        {hearts.map((heart) => (
          <Heart key={heart.id} {...heart} />
        ))}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          padding: "2rem", // Уменьшен отступ для маленьких экранов
          borderRadius: "1.5rem", // Уменьшен радиус скругления
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          textAlign: "center",
          width: "100%",
          maxWidth: "40rem", // Уменьшен максимальная ширина
          border: `0.2rem dashed ${borderColor}`, // Уменьшен толщину границы
          position: "relative",
          zIndex: 2,
        }}
      >
        <motion.h1
          className="valentine-card-h1"
          style={{
            fontSize: clicked ? "2rem" : h1FontSize, // Изменение размера шрифта при клике
            color: borderColor,
            fontWeight: "800",
            marginBottom: "1rem", // Уменьшен отступ
            textShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          }}
          whileHover={{ y: "-0.5rem" }} // Уменьшен эффект при наведении
          transition={{ duration: 0.3 }}
        >
          С Днём Святого Валентина! 💖
        </motion.h1>
        <motion.button
          className="valentine-card-button"
          style={{
            marginTop: "1rem", // Уменьшен отступ
            backgroundImage: buttonGradient,
            backgroundSize: '400% 400%',
            animation: 'gradientAnimation 15s ease infinite',
            color: "white",
            padding: "1rem 2rem", // Уменьшен отступ внутри кнопки
            borderRadius: "9999px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            transform: "scale(1)",
            transition: "transform 0.2s",
            outline: "none",
            border: "none",
            cursor: "pointer",
            fontSize: "1.25rem", // Уменьшен размер шрифта
          }}
          onClick={() => setClicked(!clicked)}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.2 }}
        >
          Жмякай!!! ❤️
        </motion.button>
        {clicked && (
          <motion.p
            className="valentine-card-p"
            style={{
              marginTop: "1rem", // Уменьшен отступ
              fontSize: "1.5rem", // Уменьшен размер шрифта
              color: "#ff4500",
              fontWeight: "600",
              textShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            }}
            initial={{ opacity: 0, y: "1rem" }} // Уменьшен отступ
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            {message}
          </motion.p>
        )}
      </motion.div>

      <AnimatePresence>
        {confetti.map((c) => (
          <Confetti key={c.id} {...c} />
        ))}
      </AnimatePresence>
    </div>
  );
}

// Добавьте этот CSS в ваш файл стилей или внутри компонента
const styles = `
@keyframes gradientAnimation {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.valentine-card {
  padding: 1rem;
}

.valentine-card h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.valentine-card button {
  font-size: 1.25rem;
  padding: 1rem 2rem;
  margin-top: 1rem;
}

.valentine-card p {
  font-size: 1.5rem;
  margin-top: 1rem;
}

.valentine-card .heart {
  width: 3rem;
  height: 3rem;
}

.valentine-card .confetti {
  width: 10px;
  height: 10px;
}

/* Медиазапросы для адаптации под мобильные устройства */
@media (max-width: 600px) {
  .valentine-card h1 {
    font-size: 2.5rem;
    margin-bottom: 0.75rem;
  }

  .valentine-card button {
    font-size: 1.125rem;
    padding: 0.75rem 1.5rem;
    margin-top: 0.75rem;
  }

  .valentine-card p {
    font-size: 1.25rem;
    margin-top: 0.75rem;
  }

  .valentine-card .heart {
    width: 2rem;
    height: 2rem;
  }

  .valentine-card .confetti {
    width: 4px;
    height: 4px;
  }
}

@media (max-width: 400px) {
  .valentine-card h1 {
    font-size: 2rem;
    margin-bottom: 0.5rem;
  }

  .valentine-card button {
    font-size: 1rem;
    padding: 0.5rem 1rem;
    margin-top: 0.5rem;
  }

  .valentine-card p {
    font-size: 1rem;
    margin-top: 0.5rem;
  }

  .valentine-card .heart {
    width: 1.5rem;
    height: 1.5rem;
  }

  .valentine-card .confetti {
    width: 3px;
    height: 3px;
  }
}
`;

document.head.appendChild(document.createElement('style')).textContent = styles;