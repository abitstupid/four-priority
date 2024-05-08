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
import TopNav from "../TopNav/TopNav";
import BottomNav from "../BottomNav/BottomNav";

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
			<TopNav cardId={Number(fetchedCardId)} />
			<BottomNav />
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
						} btn btnPrimary`}
					>
						<FaBold className="iconSizeSmall" />
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
						} btn btnPrimary`}
					>
						<FaItalic className="iconSizeSmall" />
					</button>

					{/* Bulleted List */}
					<button
						onClick={() =>
							editor.chain().focus().toggleBulletList().run()
						}
						className={`${
							editor.isActive("bulletList") ? "is-active" : ""
						} btn btnPrimary`}
					>
						<PiListBulletsFill className="iconSizeSmall" />
					</button>

					{/* Todo List */}
					<button
						onClick={() =>
							editor.chain().focus().toggleTaskList().run()
						}
						className={`${
							editor.isActive("taskList") ? "is-active" : ""
						} btn btnPrimary`}
					>
						<IoMdCheckboxOutline className="iconSizeSmall" />
					</button>

					{/* Ordered List */}
					<button
						onClick={() =>
							editor.chain().focus().toggleOrderedList().run()
						}
						className={`${
							editor.isActive("orderedList") ? "is-active" : ""
						} btn btnPrimary`}
					>
						<GoListOrdered className="iconSizeSmall" />
					</button>

					{/* UNDO */}
					<button
						onClick={() => editor.chain().focus().undo().run()}
						disabled={!editor.can().undo()}
						className={`btn btnPrimary`}
					>
						<FaUndoAlt className="iconSizeSmall" />
					</button>

					{/* REDO */}
					<button
						onClick={() => editor.chain().focus().redo().run()}
						disabled={!editor.can().redo()}
						className={`btn btnPrimary`}
					>
						<FaRedo className="iconSizeSmall" />
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
