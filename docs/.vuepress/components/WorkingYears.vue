<template>
  <span class="WorkingYears">
    {{ workingYears }}
  </span>
</template>

<script>
export default {
  name: 'WorkingYears',
  data() {
    return {
      workingYears: ''
    }
  },
  created() {
    const currDatetime = +new Date()
    const graduationDatetime = +new Date('2016/06/30')
    let workingYears = (currDatetime - graduationDatetime) / 1000 / 60 / 60 / 24 / 365
    workingYears = workingYears.toFixed(1)
    this.workingYears = workingYears
  }
}
</script>
