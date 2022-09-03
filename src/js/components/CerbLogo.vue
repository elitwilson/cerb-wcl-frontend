<script>
    import imgUrl from "../../assets/Cerb3_BW_inverted_med.png"
  

    export default {
        mounted() {
            document.getElementById('cerb-logo').src = imgUrl
        }
    }
</script>
<template>
    <div class="cerb-logo">      
        <img id="cerb-logo" class="img-fluid" alt="cerb" />
    </div>
</template>