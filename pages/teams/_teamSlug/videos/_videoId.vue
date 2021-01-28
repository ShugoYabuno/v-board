<template>
  <div class="w-full h-full bg-gray-20">
    <div class="flex w-full max-w-screen-xl h-full mx-auto">
      <div class="flex-grow h-full p-2">
        <VideoPlayer
          v-if="video"
          class="flex-grow"
          :options="convertVideoOptions(video)" />
      </div>
      <div class="relative w-1/3 h-full bg-gray-10">
        <div class="w-full h-full overflow-scroll">
          <p class="text-sm">
            テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、
          </p>
          <p class="text-sm">
            テストです
          </p>
          <p class="text-sm">
            あ
          </p>
          <p class="text-sm">
            １行目
            ２行目
          </p>
          <p class="text-sm">
            テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、
          </p>
          <p class="text-sm">
            テストです
          </p>
          <p class="text-sm">
            あ
          </p>
          <p class="text-sm">
            １行目
            ２行目
          </p>
          <p class="text-sm">
            テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、
          </p>
          <p class="text-sm">
            テストです
          </p>
          <p class="text-sm">
            あ
          </p>
          <p class="text-sm">
            １行目
            ２行目
          </p>
          <p class="text-sm">
            テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、
          </p>
          <p class="text-sm">
            テストです
          </p>
          <p class="text-sm">
            あ
          </p>
          <p class="text-sm">
            １行目
            ２行目
          </p>
          <p class="text-sm">
            テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、
          </p>
          <p class="text-sm">
            テストです
          </p>
          <p class="text-sm">
            あ
          </p>
          <p class="text-sm">
            １行目
            ２行目
          </p>
          <p class="text-sm">
            テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、
          </p>
          <p class="text-sm">
            テストです
          </p>
          <p class="text-sm">
            あ
          </p>
          <p class="text-sm">
            １行目
            ２行目
          </p>
          <p class="text-sm">
            テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、
          </p>
          <p class="text-sm">
            テストです
          </p>
          <p class="text-sm">
            あ
          </p>
          <p class="text-sm">
            １行目
            ２行目
          </p>
          <p class="text-sm">
            テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、テスト、
          </p>
          <p class="text-sm">
            テストです
          </p>
          <p class="text-sm">
            あ
          </p>
          <p class="text-sm">
            １行目
            ２行目
          </p>
        </div>
        <div class="absolute flex bottom-0 w-full h-32 p-3 opacity-95 bg-white">
          <textarea
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
              <button class="w-full h-full rounded-full flex-ij-center hover:bg-primary-10">
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
  }
}
</script>

<style>
.h-80vh {
  height: 80vh;
}

.max-w-800px {
  max-width: 800px;
}

.max-w-30 {
  max-width: 30%;
}
</style>
