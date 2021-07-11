<template>
    <v-container fluid>
        <v-card>
            <v-card-title class="text-h5 grey lighten-2">Legal Mentions</v-card-title>
            <v-card-text>
                <br>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam malesuada, mi et maximus sollicitudin, libero nibh aliquet dolor, in laoreet ipsum metus eu dui. Vestibulum eget pretium nibh. Aenean vitae dolor urna. Integer porttitor lorem ut tempus accumsan. Aliquam erat volutpat. Etiam turpis nisi, lacinia quis risus blandit, placerat accumsan ipsum. Quisque rhoncus fermentum nisl vel faucibus. Fusce suscipit ante eu posuere gravida.
                </p>
                <p>
                    Vestibulum in fringilla velit, a lacinia lorem. Praesent in ultricies ante. Duis ut metus at orci placerat consectetur. Proin tempus pulvinar laoreet. Nullam ullamcorper porttitor sem, sit amet commodo lacus interdum vitae. Morbi luctus vulputate tortor, vitae ornare augue tristique vel. Aliquam massa ante, consequat vel nibh non, gravida fermentum erat. Etiam ut interdum eros. Morbi quis purus et arcu scelerisque congue. Phasellus ultrices fringilla ex vitae molestie. In auctor malesuada ex quis elementum. In posuere pellentesque finibus.
                </p>
                <p>
                    Praesent at ultrices sem. Donec tincidunt tellus massa, et auctor augue congue a. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vestibulum lobortis in mauris et viverra. Phasellus id dictum lacus. Proin lacus tortor, euismod id aliquam a, porta tempor lectus. Nullam iaculis efficitur imperdiet. Fusce in faucibus sapien. Aliquam vel sem elit. Morbi vitae dapibus diam. Fusce massa odio, luctus semper varius id, laoreet sollicitudin nibh. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
                </p>
                <p>
                    Vivamus justo arcu, rhoncus ut velit a, convallis rutrum dui. Cras sit amet mi id quam scelerisque condimentum eget eget neque. Proin scelerisque, ante sed luctus mattis, purus purus lacinia nisl, vulputate eleifend nulla nunc id est. Morbi ac leo in nibh scelerisque congue. Donec ornare varius sem nec auctor. Praesent tincidunt quis mauris ut ultricies. Nulla a quam sit amet neque vestibulum lacinia non ut magna.
                </p>
                <p>
                    Nullam elementum eros ac mollis varius. Praesent condimentum non turpis non euismod. Nulla et est interdum, dignissim mauris non, interdum justo. Vestibulum eu eros quis mauris sagittis commodo nec eget magna. Nulla vitae felis quis massa finibus blandit eget id felis. In sed suscipit diam. Interdum et malesuada fames ac ante ipsum primis in faucibus. Mauris posuere aliquet quam ut interdum.
                </p>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
import Account from "@/api/account.js";

export default {
    name: "Login",
    data: () => ({
        user: {},
        error: "",
    }),
    methods: {
        login() {
            Account.postLogin(this.user.email, this.user.password)
                .then(() => {
                    this.$emit("loggedIn");
                    if (this.$route.params.nextUrl != null) {
                        this.$router.push(this.$route.params.nextUrl);
                    } else {
                        this.$router.push("/favorites");
                    }
                })
                .catch((error) => {
                    this.error = error.error;
                });
        },
    },
};
</script>
