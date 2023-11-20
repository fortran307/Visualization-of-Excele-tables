<template>
  <div class="d-flex align-content-center flex-wrap col-9">
    <div
      class="card border-0 me-lg-4 mb-4 d-flex"
      v-for="(question, index) in questions"
      :key="index"
    >
      <div class="backgroundEffect"></div>
      <div class="d-flex flex-column flex-fill content">
        <div class="flex-grow-1 mt-3">
          <p class="text-muted fs-6">{{ question.question }}</p>
        </div>
        <div
          class="d-flex align-items-center justify-content-between mt-3 pb-3"
        >
        <button
            type="button"
            class="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#detailQuestion"
            @click="$emit('selectQuestion', question)"
          >
            Посмотреть
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    questions: Array,
  }
}
</script>

<style scoped>
p {
  margin: 0px;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-size: 17px;
}

.card {
  width: 320px;
  height: 190px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  background: #fff;
  transition: all 0.5s ease;
  cursor: pointer;
  user-select: none;
  z-index: 10;
  overflow: hidden;
}

.card .backgroundEffect {
  bottom: 0;
  height: 0px;
  width: 100%;
}

.card:hover {
  color: #fff;
  transform: scale(1.025);
  box-shadow: rgba(0, 0, 0, 0.24) 0px 5px 10px;
}

.card:hover .backgroundEffect {
  bottom: 0;
  height: 320px;
  width: 100%;
  position: absolute;
  z-index: -1;
  background: #1b9ce3;
  animation: popBackground 0.3s ease-in;
}

@keyframes popBackground {
  0% {
    height: 10%;
    border-top-left-radius: 50%;
    border-top-right-radius: 50%;
  }

  50% {
    height: 25%;
    border-top-left-radius: 75%;
    border-top-right-radius: 75%;
  }

  75% {
    height: 50%;
    border-top-left-radius: 85%;
    border-top-right-radius: 85%;
  }

  100% {
    height: 320px;
    border-top-left-radius: 100%;
    border-top-right-radius: 100%;
  }
}

.card .text-muted {
  font-size: 12px;
}

.card:hover .text-muted {
  color: #fff !important;
}

.card .content {
  padding: 0 20px;
}

.card .content .btn {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px 10px;
  background-color: #1b9ce3;
  border-radius: 25px;
  font-size: 12px;
  border: none;
}

.card:hover .content .btn {
  background: #fff;
  color: #1b9ce3;
  box-shadow: #0000001a 0px 3px 5px;
}
</style>