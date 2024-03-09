const page = () => {
	return (
		<div className="w-full  bg-dot-primary-hsl/[0.3]  relative ">
			{/* Radial gradient for the container to give a faded look */}
			<div className="p-4 bg-gradient-to-tr from-accent/50 to-background/20 h-full">
				<p className="bg-background/50 w-full flex items-center gap-2 p-2">
					<div className="h-12 aspect-square bg-lime-400 rounded-full" />
					<div>
						<div className="text-xs flex gap-1">
							<p className=" font-semibold">John Doe</p>
							<p className="text-muted-foreground">1pm 24/jan</p>
						</div>
						<p>Hey jane</p>
					</div>
				</p>
				<p className="bg-background/50 w-full flex items-center gap-2 p-2">
					<div className="h-12 aspect-square bg-lime-400 rounded-full" />
					<div>
						<div className="text-xs flex gap-1">
							<p className=" font-semibold">John Doe</p>
							<p className="text-muted-foreground">1pm 24/jan</p>
						</div>
						<p>Hey jane</p>
					</div>
				</p>
			</div>
		</div>
	);
};

export default page;
