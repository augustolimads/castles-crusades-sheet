<script lang="ts">
  let { open, title, handleOpenDrawer, children } = $props();
</script>

<div
  class={'relative z-10 ' +
    (open ? 'opacity-100' : 'opacity-0') +
    ' pointer-events-none'}
  aria-labelledby="drawer-title"
  role="dialog"
  aria-modal="true"
>
  <div
    id="drawer-overlay"
    class="fixed inset-0 bg-gray-950/75 transition-opacity"
    aria-hidden="true"
  ></div>

  <div class="fixed inset-0 overflow-hidden">
    <div class="absolute inset-0 overflow-hidden">
      <div
        class="pointer-events-none fixed inset-y-0 left-0 flex max-w-full pr-10 sm:pr-16 transform transition-transform duration-300 ease-in-out"
        class:translate-x-0={open}
        class:-translate-x-full={!open}
      >
        <div class="pointer-events-auto relative w-screen max-w-md">
          <div
            class="absolute top-0 right-0 md:-ml-8 flex pt-4 pl-2 -mr-8 sm:-mr-10 sm:pl-4"
          >
            <button
              type="button"
              class="cursor-pointer relative rounded-md text-gray-300 hover:text-white focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-hidden"
              onclick={() => handleOpenDrawer(false)}
            >
              <span class="absolute -inset-2.5"></span>
              <span class="sr-only">Close panel</span>
              <svg
                class="size-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                aria-hidden="true"
                data-slot="icon"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div
            class="flex h-full flex-col bg-gray-950/98 border border-l-0 border-white py-6 shadow-xl rounded-r-2xl text-white"
          >
            <div class="px-4 sm:px-6">
              <h2 class="text-base font-semibold" id="drawer-title">
                {title}
              </h2>
            </div>
            <div class="relative mt-6 flex-1 px-4 sm:px-6 overflow-y-auto">
              {@render children()}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
