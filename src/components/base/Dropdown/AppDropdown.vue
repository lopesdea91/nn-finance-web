<script setup lang="ts">
import {
  VListItem,
} from "vuetify/components";
</script>

<template>
  <v-menu absolute>
    <template v-slot:activator="{ props }">
      <!-- <v-btn color="primary" dark v-bind="props"> Dropdown </v-btn> -->
      <div v-bind="props">
        <slot name="toggle" />
      </div>
    </template>

    <v-list>
      <slot name="item" :ItemOption="VListItem" />
      <!-- :itemDivider="CDropdownDivider" -->
      <!-- <v-list-item
        v-for="(item, index) in [
          { title: 'Click Me' },
          { title: 'Click Me' },
          { title: 'Click Me' },
          { title: 'Click Me 2' },
        ]"
        :key="index"
      >
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item> -->
    </v-list>
  </v-menu>

  <!-- <CDropdown class="rounded-none">
    <CDropdownToggle size="sm" class="c-dropdown-toggle">
      
    </CDropdownToggle>
    <CDropdownMenu class="c-dropdown-menu">
      <slot
        name="item"
        :ItemOption="CDropdownItem"
        :itemDivider="CDropdownDivider"
      />
    </CDropdownMenu>
  </CDropdown> -->
</template>

<style lang="scss">
.c-dropdown-toggle {
  @apply border-none;
}
.c-dropdown-menu {
  @apply py-1;

  & > * {
    @apply block px-3;

    &:not(:last-child) {
      @apply border-b border-gray-300;
    }
  }
}
</style>
