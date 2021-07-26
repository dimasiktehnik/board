<template>
	<div class="kanban-board d-flex">
		<Column
			v-for="(column, index) in board"
			:key="index"
		>
			<draggable
				v-model="board[index]"
				v-bind="dragOptions" 
				:move="onMove" 
				tag="ul" 
				class="kanban-column" 
				@start="isDragging=true" 
				@end="isDragging=false"
			>
				<transition-group 
					type="transition"
					name="flip-list"
				>
					<li 
						v-for="element in column" 
						class="list-group-item" 
						:key="element.id"
					>
						<i
							aria-hidden="true" 
							:class="element.fixed ? 'fa fa-anchor' : 'glyphicon glyphicon-pushpin'" 
							@click="element.fixed = !element.fixed" 
						/>
							{{ element.label }}
						<span class="badge">
							{{element.id}}
						</span>
					</li>
				</transition-group>
			</draggable>
		</Column>
	</div>
</template>

<script>
import board from '@/consts/board';
import draggable from "vuedraggable";
import Column from '@components/kanban/Column';

export default {
	components: {
		Column,
		draggable
	},
	data() {
    return {
			board,
      editable: true,
      isDragging: false,
      delayedDragging: false,
    };
  },
	computed: {
		dragOptions() {
			return {
				animation: 0,
				group: "description",
				disabled: !this.editable,
				ghostClass: "ghost"
			}
		},
	},
	watch: {
		isDragging(newValue) {
			if (newValue) {
				this.delayedDragging = true;
				return;
			}

			this.$nextTick(() => {
				this.delayedDragging = false;
			});
		},
	},
	methods: {
		onMove({ relatedContext, draggedContext }) {
      const relatedElement = relatedContext.element;
      const draggedElement = draggedContext.element;

      return (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed;
    }
	}
}
</script>