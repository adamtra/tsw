<template>
    <div>
        <h1>Sędziowie</h1>
        <ul>
            <li v-for="judge in judges">
                {{judge.sedzia}}
            </li>
        </ul>
    </div>
</template>

<script lang="ts" src="./Judge.ts"></script>

<style scoped>

</style>
