<script setup lang="ts">
const { status, data: session, signIn, signOut } = useSession()

// need to pass cookie for getServerSession() in ~/api/**
const headers = useRequestHeaders(['cookie']) as HeadersInit
const { data: hello } = useFetch("/api/hello", { headers })
</script>

<template>
  <!-- <NuxtWelcome /> -->
  <button @click="signIn()">Sign-In</button> <button @click="signOut()">Sign-Out</button>
  <p>useSession().status: "{{ status }}""</p>
  <pre>useSession().data: {{ JSON.stringify(session, null, 2) }}</pre>
  <pre>/api/hello: {{ hello }}</pre>
</template>

<style>
body {
  font-family: monospace;
}
</style>