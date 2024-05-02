import StarterKit from "@tiptap/starter-kit";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import ListItem from "@tiptap/extension-list-item";
import OrderedList from "@tiptap/extension-ordered-list";
import { EditorContent, useEditor } from "@tiptap/react";

// react icons
import { FaBold, FaItalic, FaUndoAlt, FaRedo } from "react-icons/fa";
import { IoMdCheckboxOutline } from "react-icons/io";
import { PiListBulletsFill } from "react-icons/pi";
import { GoListOrdered } from "react-icons/go";

import "./TipTap.scss";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";

export default function TipTap({ handleCardsDataUpdate }) {
	const location = useLocation();
	const searchParams = new URLSearchParams(location.search);
	const fetchedCard = searchParams.get("content");
	const fetchedCardContent = fetchedCard
		? JSON.parse(fetchedCard)
		: console.error("no data found");
	const fetchedCardId = searchParams.get("id");

	// EDITOR EXTENSIONS
	const extensions = [
		StarterKit,
		TaskItem.configure({
			nested: false,
		}),
		TaskList,
		OrderedList,
		ListItem,
	];

	//EDITOR CONTENT
	const content = fetchedCardContent ? fetchedCardContent.content : "";

	const editor = useEditor({
		extensions,
		content,
		onUpdate: ({ editor }) => {
			const editorContent = editor.getHTML();
			handleCardsDataUpdate(editorContent, fetchedCardId);
		},
	});

	if (!editor) {
		return null;
	}

	return (
		<>
			<div className="editorWrapper">
				<EditorContent
					className="editor"
					editor={editor}
					content={content}
				/>
				<div className="toggleBtnWrapper">
					{/* BOLD */}
					<button
						onClick={() =>
							editor.chain().focus().toggleBold().run()
						}
						disabled={
							!editor.can().chain().focus().toggleBold().run()
						}
						className={`${
							editor.isActive("bold") ? "is-active" : ""
						} toggleBtn`}
					>
						<FaBold />
					</button>

					{/* ITALIC */}
					<button
						onClick={() =>
							editor.chain().focus().toggleItalic().run()
						}
						disabled={
							!editor.can().chain().focus().toggleItalic().run()
						}
						className={`${
							editor.isActive("italic") ? "is-active" : ""
						} toggleBtn`}
					>
						<FaItalic />
					</button>

					{/* Bulleted List */}
					<button
						onClick={() =>
							editor.chain().focus().toggleBulletList().run()
						}
						className={`${
							editor.isActive("bulletList") ? "is-active" : ""
						} toggleBtn`}
					>
						<PiListBulletsFill />
					</button>

					{/* Todo List */}
					<button
						onClick={() =>
							editor.chain().focus().toggleTaskList().run()
						}
						className={`${
							editor.isActive("taskList") ? "is-active" : ""
						} toggleBtn`}
					>
						<IoMdCheckboxOutline />
					</button>

					{/* Ordered List */}
					<button
						onClick={() =>
							editor.chain().focus().toggleOrderedList().run()
						}
						className={`${
							editor.isActive("orderedList") ? "is-active" : ""
						} toggleBtn`}
					>
						<GoListOrdered />
					</button>

					{/* UNDO */}
					<button
						onClick={() => editor.chain().focus().undo().run()}
						disabled={!editor.can().undo()}
						className={`toggleBtn`}
					>
						<FaUndoAlt />
					</button>

					{/* REDO */}
					<button
						onClick={() => editor.chain().focus().redo().run()}
						disabled={!editor.can().redo()}
						className={`toggleBtn`}
					>
						<FaRedo />
					</button>
				</div>
			</div>
		</>
	);
}

TipTap.propTypes = {
	handleCardsDataUpdate: PropTypes.any,
	cardsData: PropTypes.array,
};
