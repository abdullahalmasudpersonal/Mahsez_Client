const Loader2 = () => {
  return (
    <div>
      <style>
        {`
           .loader2 {
  width: 50px;
  aspect-ratio: 1;
  display: grid;
  border-radius: 50%;
  background: linear-gradient(
        0deg,
        rgba(255, 102, 0, 0.5) 30%,
        #ff5e0000 0 70%,
        rgb(255, 102, 0) 0
      )
      50%/8% 100%,
    linear-gradient(
        90deg,
        rgba(255, 102, 0, 0.5) 30%,
        #ff5e0000 0 70%,
        rgba(255, 102, 0) 0
      )
      50%/100% 8%;
  background-repeat: no-repeat;
  animation: l23 1s infinite steps(12);
}
.loader2::before,
.loader2::after {
  content: "";
  grid-area: 1/1;
  border-radius: 50%;
  background: inherit;
  opacity: 0.915;
  transform: rotate(30deg);
}
.loader2::after {
  opacity: 0.83;
  transform: rotate(60deg);
}
@keyframes l23 {
  100% {
    transform: rotate(1turn);
  }
}

          `}
      </style>
      <div className="loader2"></div>
    </div>
  );
};

export default Loader2;
