$('document').ready(() => {
	
	// Handler to Add New Asset
	const table = $("#formTable tbody");
	let count = 1;

	const addTableListeners = () => {
		
		// Auto Add New Row when Tab is pressed on Last Input
		$('[id*="proc_"]').keydown(function(key){
			if (this.id == `proc_${count}` && key.which == 9) {
				key.preventDefault();
				$('#add').click();
			}
		});

		// Add Handler to Remove New Asset
		$('.remove-button').click(function(){
			let index = $(this).attr('index');
			$(`tr[index='${index}'`).remove();
		});	
	}

		
	$('#add').click(() => {
		
		// Increment Row Index
		count++;
		
		
		// Add New Row with Increment
		const newRow = `
			<tr index='${count}'>
					<td><button class='remove-button' index='${count}'>🗙</button></td>
					<td><input id='description_${count}' type='text'/></td>
					<td><input id='manufacturer_${count}' type='text'/></td>
					<td><input id='serial_no_${count}' type='text'/></td>
					<td>
						<select id="category_${count}">
							<option disabled selected value> -- select an option -- </option>
							<option value="Audio/Visual">Audio/Visual</option>
							<option value="Furniture/Equpipment">Furniture/Equpipment</option>
							<option value="Copier Machine">Copier Machine</option>
							<option value="Fax Machine">Fax Machine</option>
						</select>
					<td>
						<select id="location_${count}">
							<option disabled selected value> -- select an option -- </option>
							<option value="130 Livingston">130 Livingston</option>
							<option value="2 Broadway">2 Broadway</option>
							<option value="Williams Place">Williams Place</option>
							<option value=">Northern">Northern</option>
						</select>
					</td>
					<td><input id='floor_${count}' type='text'/></td>
					<td><input id="room_${count}" type='text'/></td>
					<td><span class='dollar-sign'>$</span><input id="cost_${count}" type='number' class='price-input'/></td>
					<td><input id='purchase_${count}' type='date'/></td>
					<td><input id='po_${count}' type='text'/></td>
					<td><input id='proc_${count}' type='text'/></td>
				</tr>
		`;

		table.append(newRow);
		
		// Scroll Table to Bottom and Autofocus Input
		$('.table-wrapper').scrollTop($('.table-wrapper').height());
		$(`#description_${count}`).focus();
		
		addTableListeners();
		
	});


	addTableListeners();
	

	
	// Handler to Submit Data
	$('#submit').click(() =>{

		//Format all Data into JSON for Submission
		let data = [];

		// Iterate over all rows and store data
		for (let i = 1; i <= count; i++){

			// Skip Row if it was Removed
			if (!$(`tr[index=${i}]`).length) continue;

			// Store all Info from this row
			let assetInfo = {
				description: $(`#description_${i}`).val(),
				manufacturer: $(`#manufacturer_${i}`).val(),
				serial_no: $(`#serial_no_${i}`).val(),
				category: $(`#category_${i}`).val(),
				location_: $(`#location_${i}`).val(),
				floor: $(`#floor_${i}`).val(),
				room: $(`#room_${i}`).val(),
				cost: $(`#cost_${i}`).val(),
				purchase: $(`#purchase_${i}`).val(),
				po: $(`#po_${i}`).val(),
				proc: $(`#proc_${i}`).val()	
			}

			// TODO: Check for Empty Inputs and Enforce Users to Fill out Fields

			// Add Info to array
			data.push(assetInfo);
		}

		//TODO: Upload JSON to Database
		console.log(data);

	})




})