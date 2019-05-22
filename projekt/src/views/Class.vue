<template>
    <div>
        <h1>Klasy</h1>
        <ul>
            <li v-for="classEl in classes">
                {{classEl.numer}} - {{classEl.kat}}
            </li>
        </ul>
    </div>
</template>

<script lang="ts" src="./Class.ts"></script>

<style scoped>

</style>
