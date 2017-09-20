<template>
    <div>
        <button @click="vai()">Clicable</button>
        <hr>

        <div class="ui basic modal">
            <div class="ui icon header">
                <i class="archive icon"></i>
                Archive Old Messages
            </div>
            <div class="content">
                <p>Your inbox is getting full, would you like us to enable automatic archiving of old messages?</p>
            </div>
            <div class="actions">
                <div class="ui red basic cancel inverted button">
                    <i class="remove icon"></i>
                    No
                </div>
                <div class="ui green ok inverted button">
                    <i class="checkmark icon"></i>
                    Yes
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    export default{
        data(){
            return {
                msg: 'hello vue',
                animated: true,
            }
        },
        methods: {
            vai() {
                console.log('indo');
                $('.ui.basic.modal').modal('show');
            }
        }
    }
</script>
