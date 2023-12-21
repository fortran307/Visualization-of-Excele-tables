<template>
  <div class="loading-overlay">
    <div class="d-flex flex-column align-items-center">
      <span class="fw-bold text-white mb-3">Идет конвертация данных...</span>
      <span class="loader"></span>
    </div>
  </div>
</template>

<style>
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.loader {
  position: relative;
  width: 100px;
  height: 16px;
}

.loader:before,
.loader:after {
  content: "";
  position: absolute;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 32px 0 #fff;
  left: 0;
  top: 0;
  animation: ballMoveX 1s linear infinite;
}

.loader:after {
  box-shadow: none;
  transform-origin: 40px 0;
  transform: rotate(-153deg);
  animation: rotateLoader 1s linear infinite;
}

@keyframes rotateLoader {
  0%,
  10% {
    transform: rotate(-153deg);
  }
  90%,
  100% {
    transform: rotate(0deg);
  }
}

@keyframes ballMoveX {
  0%,
  10% {
    transform: translateX(0)
  }
  90%,
  100% {
    transform: translateX(32px)
  }
}
</style>