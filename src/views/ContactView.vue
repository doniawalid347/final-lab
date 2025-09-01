<template>
  <div>
    <h2>Contact Us</h2>
    <form @submit.prevent="submit">
      <div class="mb-3">
        <label>Name</label>
        <input v-model="form.name" class="form-control"/>
        <div class="text-danger" v-if="submitted && !form.name">Name is required</div>
      </div>
      <div class="mb-3">
        <label>Email</label>
        <input type="email" v-model="form.email" class="form-control"/>
        <div class="text-danger" v-if="submitted && !form.email">Email is required</div>
      </div>
      <div class="mb-3">
        <label>Message</label>
        <textarea v-model="form.message" class="form-control"></textarea>
        <div class="text-danger" v-if="submitted && !form.message">Message is required</div>
      </div>
      <button class="btn btn-primary">Submit</button>
      <div v-if="success" class="alert alert-success mt-3">Thank you for contacting us!</div>
    </form>
  </div>
</template>

<script>
import { reactive, ref } from 'vue'

export default {
  name: 'ContactView',
  setup() {
    const form = reactive({ name:'', email:'', message:'' })
    const submitted = ref(false)
    const success = ref(false)

    const submit = () => {
      submitted.value = true
      if(form.name && form.email && form.message){
        success.value = true
        form.name=''; form.email=''; form.message=''
      }
    }

    return { form, submitted, success, submit }
  }
}
</script>