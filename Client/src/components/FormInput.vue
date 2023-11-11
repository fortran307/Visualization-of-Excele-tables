<template>
  <div>
    <input type="file" class="form-control" aria-label="file example" @change="handleFileUpload" />
  </div>
</template>

<script>
export default {
  emits: ['load-file'],
  methods: {
    handleFileUpload(event){
      const file = event.target.files[0];
      this.$emit('load-file', file);
    }
  }
}
</script>