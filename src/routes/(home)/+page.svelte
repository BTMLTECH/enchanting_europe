<script lang="ts">
	import { enhance, applyAction } from '$app/forms';
	import { superForm } from 'sveltekit-superforms';

	export let data;

	// Client API:
	const { form, errors, constraints, message } = superForm(data.form);
	let isLoading: boolean = false;
	let formSubmitted: boolean | undefined = false;
</script>


<section class="relative h-0 pb-[66%]">
	<div
		style="background-image: url('../../images/hero-bg1.png'); background-size: 100% auto;"
		class="absolute w-full top-0 h-full overflow-hidden bg-cover bg-no-repeat"
	>
		<div class="w-full flex justify-center absolute -bottom-52 md:-bottom-[12rem]">
			<div
				class="w-[65%] h-[270px] sm:w-[330px] sm:h-[330px] bg-white text-black rounded-t-[100%] p-8 mx-auto flex flex-col justify-center items-center relative top-0 md:w-[300px] md:h-[300px] lg:h-[350px] lg:w-[350px]"
			>
				<p
					class="font-bold text-[calc(12px_+_.3rem)] top-[calc(-90px_+_-6px)] sm:text-3xl sm:leading-[24px] md:text-[20px] md:leading-[24px] md:text-3xl lg:text-4xl lg:leading-[30px] text-center relative sm:top-[-90px] md:top-[-80px] lg:top-[-70px] leading-[15px]"
				>
					<span class="text-[#F17600]">ENCHANTING</span> <br />EUROPE
				</p>
			</div>
		</div>
	</div>
</section>

<section class="relative h-0 pb-[33%]">
	<!-- <img src="" alt="" class="absolute w-full h-full inset-0 object-cover object-top"> -->
	<div
		style="background-image: url('../../images/location.png'); background-size: 100% auto;"
		class="absolute w-full top-0 h-full overflow-hidden bg-cover bg-no-repeat"
	></div>
</section>

<section class="relative h-0 pb-[30%]">
	<div
		style="background-image: url('../../images/location1.png'); background-size: 100% auto;"
		class="absolute w-full top-0 h-full overflow-hidden bg-cover bg-no-repeat"
	></div>
</section>

<section class="contact-form bg-gray-200">
	<form
		method="POST"
		use:enhance={() => {
			isLoading = true;
			formSubmitted = false;
			return async ({ result, update }) => {
				if (result.status !== 200) {
					isLoading = false;
					formSubmitted = undefined;
					return await update();
				}
				isLoading = false;
				formSubmitted = true;
				await applyAction(result);
			};
		}}
		class="w-10/12 mx-auto shadow-2xl rounded-lg p-10 md:py-20 bg-white my-10 md:my-32 grid gap-8 border border-[#E07514]"
	>
		<div class="grid gap-7 md:w-4/6 mx-auto">
			<label for="name" class="flex flex-col gap-2">
				<span class={`${$errors.firstName?.length ? 'text-red-500' : ''} font-bold md:text-xl`}>
					Your Name
				</span>
				<div class="flex justify-between gap-3 md:gap-8">
					<label for="firstName" class="flex flex-col w-full">
						<input
							disabled={isLoading}
							type="text"
							placeholder="First name"
							name="firstName"
							id="firstName"
							aria-invalid={$errors.firstName ? true : false}
							on:keypress={(ev) => {
								formSubmitted = false
								$errors.firstName = undefined;
							}}
							bind:value={$form.firstName}
							class={`${$errors.firstName?.length ? 'border border-red-500' : ''} w-full p-3 rounded shadow-inner bg-gray-50 border border-[#e0771463] focus:outline-none`}
						/>
						{#if $errors.firstName?.length}
							<p class="text-red-500 italic">{$errors.firstName}</p>
						{/if}
					</label>

					<label for="lastName" class="flex flex-col w-full">
						<input
							disabled={isLoading}
							type="text"
							placeholder="Last name"
							name="lastName"
							id="lastName"
							aria-invalid={$errors.lastName ? true : false}
							on:keypress={(ev) => {
								formSubmitted = false
								$errors.lastName = undefined;
							}}
							bind:value={$form.lastName}
							class={`${$errors.lastName?.length ? 'border border-red-500' : ''} w-full p-3 rounded shadow-inner bg-gray-50 border border-[#e0771463] focus:outline-none`}
						/>
						{#if $errors.lastName?.length}
							<p class="text-red-500 italic">{$errors.lastName}</p>
						{/if}
					</label>
				</div>
			</label>

			<label for="email" class="flex flex-col gap-2">
				<span class={`${$errors.email?.length ? 'text-red-500' : ''} font-bold md:text-xl`}>
					Email Address
				</span>
				<input
					disabled={isLoading}
					type="email"
					name="email"
					id="email"
					aria-invalid={$errors.email ? true : false}
					on:keypress={(ev) => {
						formSubmitted = false
						$errors.email = undefined;
					}}
					bind:value={$form.email}
					placeholder="Eg. example@email.com"
					class={`${$errors.email?.length ? 'border border-red-500' : ''} w-full p-3 rounded shadow-inner bg-gray-50 border border-[#e0771463] focus:outline-none`}
				/>
				{#if $errors.email?.length}
					<p class="text-red-500 italic">{$errors.email}</p>
				{/if}
			</label>

			<label for="phoneNumber" class="flex flex-col gap-2">
				<span class={`${$errors.phoneNumber?.length ? 'text-red-500' : ''} font-bold md:text-xl`}>
					Phone Number
				</span>
				<input
					disabled={isLoading}
					type="tel"
					name="phoneNumber"
					id="phoneNumber"
					placeholder="+234"
					on:keypress={(ev) => {
						formSubmitted = false
						$errors.phoneNumber = undefined;
					}}
					bind:value={$form.phoneNumber}
					class={`${$errors.phoneNumber?.length ? 'border border-red-500' : ''} w-full p-3 rounded shadow-inner bg-gray-50 border border-[#e0771463] focus:outline-none`}
				/>
				{#if $errors.phoneNumber?.length}
					<p class="text-red-500 italic">{$errors.phoneNumber}</p>
				{/if}
			</label>
			{#if formSubmitted}
				<p class="text-green-500 font-bold">Thank you. Form submitted successfully.</p>
			{/if}
			{#if formSubmitted === undefined}
				<p class="text-red-500 font-bold">An error has occured. Please try again</p>
			{/if}
		</div>

		<button
			disabled={isLoading}
			class={`${isLoading ? 'opacity-50' : ''} text-white p-4 w-full bg-black md:w-4/6 mx-auto rounded-md`}
			>{isLoading ? 'Submitting...' : 'Submit'}</button
		>
	</form>
</section>
