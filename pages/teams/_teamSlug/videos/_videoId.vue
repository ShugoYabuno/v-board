<template>
  <div class="w-full h-full bg-gray-20">
    <div class="md:flex w-full max-w-screen-xl h-full mx-auto">
      <div class="md:flex-grow md:h-full p-2">
        <VideoPlayer
          v-if="video"
          class="flex-grow"
          :options="convertVideoOptions(video)" />
      </div>
      <div class="relative md:w-1/3 h-96 md:h-full bg-gray-10">
        <div class="w-full h-full md:pb-32 overflow-scroll">
          <div
            v-for="(comment, index) in comments"
            :key="index"
            class="p-2 hover:bg-primary-10">
            <div class="flex-i-center h-5">
              <div class="w-5 h-5">
                <UserIcon />
              </div>
              <p
                v-if="commentUsers.length >= 1"
                class="ml-2 text-sm font-bold text-gray-90">
                {{ displayName(comment) }}
              </p>
            </div>
            <!-- <p
              class="text-gray"
              v-html="comment.content" /> -->
            <p class="-mt-5 leading-5 whitespace-pre-line text-gray">
              {{ comment.content }}
            </p>
          </div>
        </div>
        <div class="md:absolute flex bottom-0 w-full h-32 p-3 opacity-95 bg-white">
          <textarea
            v-model="commentContent"
            rows="6"
            class="flex-grow block form-control resize-none text-sm opacity-100"
            placeholder="コメントを投稿…" />
          <div class="w-12 ml-3">
            <div class="h-1/2 flex-ij-center">
              <div class="w-9 h-9">
                <UserIcon />
              </div>
            </div>
            <div class="h-1/2 flex-ij-center">
              <button
                class="w-full h-full rounded-full flex-ij-center hover:bg-primary-10"
                @click="onSubmit()">
                <font-awesome-icon
                  icon="paper-plane"
                  class="text-secondary fa-2x" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VideoPlayer from "~/components/parts/VideoPlayer"
import UserIcon from "~/components/modules/UserIcon"
import { library } from "@fortawesome/fontawesome-svg-core"
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import { firestore } from "~/plugins/firebase"

library.add(faPaperPlane)

export default {
  components: {
    VideoPlayer,
    FontAwesomeIcon,
    UserIcon
  },
  layout: "user",
  async asyncData({store, params}) {
    const video = await store.dispatch("fsFind", {
      collectionName: "videos",
      documentId: params.videoId
    })

    return {
      video
    }
  },
  data() {
    return {
      comments: [],
      commentContent: "",
      commentUsers: []
    }
  },
  computed: {
    displayName() {
      return function(_comment) {
        const user = this.commentUsers.find(_commentUser => _comment.userId === _commentUser.documentId)
        return user.displayName
      }
    }
  },
  mounted() {
    const videoId = this.$route.params.videoId
    firestore.collection("videos")
      .doc(videoId)
      .collection("comments")
      .onSnapshot(_querySnapShot => {
        _querySnapShot.docChanges().forEach(_change => {
          if(_change.type === "added") {
            const doc = _change.doc
            this.comments.push(doc.data())
          }
        })

        this.getUserIcon()
      })
  },
  methods: {
    convertVideoOptions(_video) {
      return {
        autoplay: true,
        controls: true,
        sources: [
          {
            src: _video.storageUrl,
            type: _video.contentType,
          },
        ]
      }
    },
    async onSubmit() {
      const userInfo = await this.$store.getters["userInfo"]

      const videoId = this.$route.params.videoId
      const userId = userInfo.documentId
      const content = this.commentContent

      console.log(content)

      await firestore
        .collection("videos")
        .doc(videoId)
        .collection("comments")
        .add({
          userId,
          content,
          createdAt: Date.now(),
          updatedAt: Date.now()
        })
    },
    async getUserIcon() {
      const userIds = this.comments.map(_comment => _comment.userId)
      const uniqUserIds = [...new Set(userIds)]

      const userInfoPromises = uniqUserIds.map(_userId => {
        return new Promise((resolve, reject) => {
          this.$store.dispatch("fsFind", {
            collectionName: "users",
            documentId: _userId
          }).then(_value => {
            resolve(_value)
          }).catch(_e => {
            reject({
              displayName: "不明なユーザー"
            })
          })
        })
      })

      Promise.all(userInfoPromises).then(users => {
        users.forEach(_user => {
          this.commentUsers.push(_user)
        })
      })
    }
  }
}
</script>

<style>
.h-30rem {
  height: 30rem;
}
</style>
