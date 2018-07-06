<template>
    <div class="welcome_box">
            <img class="welcome_img" src="../../assets/welcome.png" />
    </div>
</template>

<style lang="scss" scoped>
    .welcome_box {
        overflow: hidden;
        position: relative;
        width:100%;
        height: 700px;
        .welcome_img{
            position: absolute;
            left: 50%;
            top: 40%;
            transform: translate(-50%);
        }
    }
</style>