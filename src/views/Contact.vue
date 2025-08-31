<template>
  <div class="container mt-4">
    <h2>Contact Us</h2>
    <form @submit.prevent="submitForm" novalidate>
      <div class="mb-3">
        <label class="form-label">Name</label>
        <input v-model="name" type="text" class="form-control">
        <small v-if="errors.name" class="text-danger">{{ errors.name }}</small>
      </div>
      <div class="mb-3">
        <label class="form-label">Email</label>
        <input v-model="email" type="email" class="form-control">
        <small v-if="errors.email" class="text-danger">{{ errors.email }}</small>
      </div>
      <div class="mb-3">
        <label class="form-label">Message</label>
        <textarea v-model="message" class="form-control"></textarea>
        <small v-if="errors.message" class="text-danger">{{ errors.message }}</small>
      </div>
      <button class="btn btn-primary">Submit</button>
    </form>
    <div v-if="successMessage" class="alert alert-success mt-3">{{ successMessage }}</div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "ContactView",
  setup() {
    const name = ref("");
    const email = ref("");
    const message = ref("");
    const successMessage = ref("");
    const errors = ref({});

    const submitForm = () => {
      errors.value = {};
      if (!name.value) errors.value.name = "Name is required";
      if (!email.value) errors.value.email = "Email is required";
      if (!message.value) errors.value.message = "Message is required";

      if (Object.keys(errors.value).length === 0) {
        successMessage.value = "Thank you for contacting us!";
        name.value = "";
        email.value = "";
        message.value = "";
      }
    };

    return { name, email, message, errors, successMessage, submitForm };
  },
};
</script>
