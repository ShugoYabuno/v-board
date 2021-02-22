<template>
  <div class="wrapper w-full bg-gray-20">
    <div class="md:flex w-full max-w-screen-xl md:h-full overflow-scroll mx-auto">
      <div class="p-2 md:flex-grow md:h-full md:w-2/3 md:overflow-scroll">
        <VideoPlayer
          v-if="video"
          class="w-full md:h-96 lg:h-120 flex-i-center"
          :options="convertVideoOptions(video, true, true)" />
        <div
          v-if="videos.length >= 1"
          class="flex flex-wrap">
          <nuxt-link
            v-for="(video, index) in videos"
            :key="index"
            :to="`/teams/${teamSlug}/videos/${video.documentId}`"
            class="hidden md:block w-1/2 md:w-4/12 lg:w-3/12 p-4 hover:bg-secondary-10">
            <VideoPlayer
              v-if="video"
              :options="convertVideoOptions(video)" />
          </nuxt-link>
        </div>
      </div>
      <div class="flex flex-col relative max-h-120 md:w-1/3 md:h-full md:max-h-screen bg-gray-10">
        <div class="flex-grow w-full overflow-scroll">
          <div
            v-for="(comment, index) in comments"
            :key="index"
            class="p-2 hover:bg-primary-10">
            <div
              class="flex-i-center h-5">
              <div class="w-5 h-5">
                <CircleImg
                  :img-src="iconImageUrl(comment.userId)"
                  :alt="`${displayName(comment.userId)}のアイコン`" />
              </div>
              <p
                v-if="commentUsers.length >= 1"
                class="ml-2 text-sm font-bold text-gray-90">
                {{ displayName(comment.userId) }}
              </p>
              <button
                v-if="userInfo.documentId === comment.userId"
                class="flex-ij-center ml-auto w-4 h-4"
                @click="onDelete(comment.documentId)">
                <font-awesome-icon
                  icon="times"
                  class="text-red fa-sm" />
              </button>
            </div>
            <p class="-mt-5 leading-5 whitespace-pre-line text-gray">
              {{ comment.content }}
            </p>
          </div>
        </div>
        <div class="flex bottom-0 w-full h-32 p-3 opacity-95 bg-white">
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
      <div
        v-if="videos.length >= 1"
        class="flex flex-wrap">
        <nuxt-link
          v-for="(video, index) in videos"
          :key="index"
          :to="`/teams/${teamSlug}/videos/${video.documentId}`"
          class="block md:hidden w-1/2 md:w-4/12 lg:w-3/12 p-4 hover:bg-secondary-10">
          <VideoPlayer
            v-if="video"
            :options="convertVideoOptions(video)" />
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import VideoPlayer from "~/components/parts/VideoPlayer"
import CircleImg from "~/components/parts/CircleImg"
import UserIcon from "~/components/modules/UserIcon"
import { library } from "@fortawesome/fontawesome-svg-core"
import { faPaperPlane, faTimes } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import { firestore } from "~/plugins/firebase"

library.add(faPaperPlane)
library.add(faTimes)

export default {
  components: {
    VideoPlayer,
    FontAwesomeIcon,
    CircleImg,
    UserIcon
  },
  layout: "user",
  async asyncData({store, params}) {
    const video = await store.dispatch("fsFind", {
      collectionName: "videos",
      documentId: params.videoId
    })

    return {
      video,
      teamSlug: params.teamSlug
    }
  },
  data() {
    return {
      comments: [],
      commentContent: "",
      commentUsers: [],
      videos: [],
      userInfo: {}
    }
  },
  computed: {
    displayName() {
      return function(_commentUserId) {
        const user = this.commentUsers.find(_commentUser => _commentUser.documentId === _commentUserId)
        if (user) {
          return user.displayName
        } else {
          return ""
        }
      }
    },
    iconImageUrl() {
      return function(_commentUserId) {
        const user = this.commentUsers.find(_commentUser => _commentUser.documentId === _commentUserId)
        if (user) {
          return user.iconImageUrl
        } else {
          return ""
        }
      }
    },
  },
  async mounted() {
    this.userInfo = await this.$store.getters["userInfo"]
    const videoId = this.$route.params.videoId
    this.getOtherVideos()
    firestore.collection("videos")
      .doc(videoId)
      .collection("comments")
      .orderBy("createdAt")
      .onSnapshot(_querySnapShot => {
        _querySnapShot.docChanges().forEach(_change => {
          if(_change.type === "added") {
            this.comments.push({
              documentId: _change.doc.id,
              ..._change.doc.data()
            })
          } else if(_change.type === "removed") {
            this.comments = this.comments.filter(_comment => _comment.documentId !== _change.doc.id)
          }
        })

        this.getUserIcon()
      })
  },
  methods: {
    convertVideoOptions(_video, autoplay = false, controls = false) {
      return {
        autoplay,
        controls,
        sources: [
          {
            src: _video.storageUrl,
            type: _video.contentType,
          },
        ]
      }
    },
    async onSubmit() {
      const videoId = this.$route.params.videoId
      const userId = this.userInfo.documentId
      const content = this.commentContent

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

      this.commentContent = ""
    },
    async onDelete(_commentId) {
      const videoId = this.$route.params.videoId

      await firestore
        .collection("videos")
        .doc(videoId)
        .collection("comments")
        .doc(_commentId)
        .delete()
        .then(function() {
          console.log("Document successfully deleted!")
        }).catch(function(error) {
          console.error("Error removing document: ", error)
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
    },
    async getOtherVideos() {
      const teamInfo = await this.$store.getters["teamInfo"]

      const videos = await this.$store.dispatch("video/getByTeam", {
        teamId: teamInfo.documentId
      })

      this.videos = videos.filter(_video => _video.documentId !== this.$route.params.videoId)
    }
  }
}
</script>

<style scoped>
.h-30rem {
  height: 30rem;
}

.wrapper {
  height: calc(100vh - 3rem);
}
</style>
