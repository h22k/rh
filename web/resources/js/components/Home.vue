<template>
    <div class="row justify-content-center">
        <div class="col-md-6">
            <div class="card">
                <div class="card-header d-flex justify-content-between">
                    <span class="d-inline-block mt-auto">Laravel | WEB</span>
                    <button @click.prevent="addPost" class="btn btn-primary">Gönderi Ekle</button>
                </div>
                <div class="card-body d-flex flex-column justify-content-center border-bottom" v-for="p in post" :key="p.id">
                    <div class="post w-100">
                        <div class="content">
                            {{ p.content }}
                        </div>
                        <div class="bottom-content d-flex justify-content-end">
                            <div class="email h-50 mt-auto">
                                By: {{ p.user.email }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-6">
            <div class="card">
                <div class="card-header">Node.js | API</div>
                <div class="card-body d-flex flex-column justify-content-center border-bottom" v-for="po in nodePosts" :key="po.id">
                    <div class="post w-100">
                        <div class="content">
                            {{ po.content }}
                        </div>
                        <div class="bottom-content d-flex justify-content-end">
                            <div class="email h-50 mt-auto">
                                By: {{ po.user.email }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: "Home",
    methods: {
        async addPost() {
            const { value } = await this.$swal({
                title: 'Enter a post',
                input: 'text',
                inputLabel: 'Content',
                inputValue: '',
                showCancelButton: true,
                inputValidator: (value) => {
                    if (!value) {
                        return 'You need to write something!'
                    }
                }
            })

            if (value) {
                const response = await axios.post('api/post/create', {content: value, user_id: this.user})
                const data = response.data
                if ( ! data.status) {
                    this.$swal('Could not post create:(')
                    return
                }

                this.$socket.emit('postCreated', {user_id: this.user})

            }
        }
    },
    props: [
        'user',
        'post'
    ],
    sockets: {
        connect: function() {
            console.log('socket connected')
        },
        postC: async function (val) {
            if (val.user_id !== this.user) {
                this.$swal(val.msg)
            }
            const posts = await axios.get('/api/post')
            const nodePost = await nodeAxios.get('/post')
            this.nodePosts = nodePost.data.data
            this.post = posts.data.data.data
        },
    },
    async created() {
        this.post = JSON.parse(this.post)
        const response = await nodeAxios.get('post')
        this.nodePosts = response.data.data
    },
    data() {
        return {
            nodePosts: []
        }
    }

}
</script>

<style scoped>

</style>
