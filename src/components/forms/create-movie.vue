<script lang="ts" setup>
import { reactive } from "vue";

const formData = reactive({
    title: '',
    thumbnail: '',
    description: '',
    year: '',
    duration: '',
    rating: '',
    category: '',
    language: '',
    quality: '',
    episodes: [],
    seasons: [],
    imgGallery: [],   
 });

const handleSubmit = async () => {
 
};

</script>

<template>
    <form @submit.prevent="handleSubmit">
        <input type="text" v-model="formData.title" placeholder="Title" />
        <input type="text" v-model="formData.thumbnail" placeholder="Thumbnail" />
        <input type="text" v-model="formData.description" placeholder="Description" />
        <input type="text" v-model="formData.year" placeholder="Year" />
        <input type="text" v-model="formData.duration" placeholder="Duration" />
        <input type="text" v-model="formData.rating" placeholder="Rating" />
    </form>
</template>