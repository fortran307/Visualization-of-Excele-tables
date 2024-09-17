<template>
  <ul class="nav nav-tabs justify-content-end">
    <li class="nav-item" v-for="sheet in sheets">
      <button 
        class="nav-link" 
        :class="currentSheet === sheets.indexOf(sheet)? 'active' : ''"
        @click.prevent="$emit('changeSheet', sheets.indexOf(sheet))" 
      >{{ sheet.sheet }}</button>
    </li>
  </ul>
</template>

<script>
export default {
  props: ['sheets', 'currentSheet']
}
</script>