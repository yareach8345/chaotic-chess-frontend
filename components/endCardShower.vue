<script setup lang="ts">
import CheckmateUserWin from "~/components/endCards/CheckmateUserWin.vue";
import CheckmateUserLose from "~/components/endCards/CheckmateUserLose.vue";
import UserLoseCuzKillKing from "~/components/endCards/UserLoseCuzKillKing.vue";
import UserLoseCuzKilledUserKingByAI from "~/components/endCards/UserLoseCuzKilledUserKingByAI.vue";
import IllegalInput from "~/components/endCards/Illegal_input.vue";
import CoupDetat from "~/components/endCards/CoupDetat.vue";

interface Props {
  endCardName: string
}

const props = defineProps<Props>()

const endCardsMap = new Map<string, any>()
endCardsMap.set("checkmate_user_win", CheckmateUserWin)
endCardsMap.set("checkmate_user_lose", CheckmateUserLose)
endCardsMap.set("user_lose_cuz_kill_king", UserLoseCuzKillKing)
endCardsMap.set("user_lose_cuz_user_king_killed_by_ai", UserLoseCuzKilledUserKingByAI)
endCardsMap.set("illegal_input", IllegalInput)
endCardsMap.set("coup_detat", CoupDetat)

const component = endCardsMap.get(props.endCardName)
</script>

<template>
  <component :is="component"/>
</template>

<style scoped>

</style>