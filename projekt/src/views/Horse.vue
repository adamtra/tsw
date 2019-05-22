<template>
    <div>
        <h1>Konie</h1>
        <ul>
            <li v-for="horse in horses">
                {{horse.nazwa}}
            </li>
        </ul>
    </div>
</template>

<script lang="ts" src="./Horse.ts"></script>

<style scoped>

</style>
